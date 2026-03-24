#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype, Address, BytesN, Env, String, Vec, vec
};

#[contracttype]
#[derive(Clone)]
pub struct GiftInfo {
    pub contract_id: Address,
    pub organiser: Address,
    pub occasion: String,
    pub created_at: u64,
}

#[contracttype]
pub enum DataKey {
    Gifts,
    GiftCount,
}

#[contract]
pub struct GiftFactory;

#[contractimpl]
impl GiftFactory {
    // Deploy a new GiftDrop contract
    pub fn create_gift(
        env: Env,
        organiser: Address,
        wasm_hash: BytesN<32>,
        salt: BytesN<32>,
        occasion: String,
    ) -> Address {
        organiser.require_auth();

        // Deploy new GiftDrop contract (inter-contract call)
        let deployed_address = env
            .deployer()
            .with_current_contract(salt)
            .deploy_v2(wasm_hash, ());

        let gift_info = GiftInfo {
            contract_id: deployed_address.clone(),
            organiser: organiser.clone(),
            occasion,
            created_at: env.ledger().timestamp(),
        };

        // Store gift info
        let mut gifts: Vec<GiftInfo> = env
            .storage()
            .instance()
            .get(&DataKey::Gifts)
            .unwrap_or(vec![&env]);

        gifts.push_back(gift_info);
        env.storage().instance().set(&DataKey::Gifts, &gifts);

        // Increment count
        let count: u32 = env
            .storage()
            .instance()
            .get(&DataKey::GiftCount)
            .unwrap_or(0);
        env.storage().instance().set(&DataKey::GiftCount, &(count + 1));

        deployed_address
    }

    // Get all gifts
    pub fn get_all_gifts(env: Env) -> Vec<GiftInfo> {
        env.storage()
            .instance()
            .get(&DataKey::Gifts)
            .unwrap_or(vec![&env])
    }

    // Get total gift count
    pub fn get_count(env: Env) -> u32 {
        env.storage()
            .instance()
            .get(&DataKey::GiftCount)
            .unwrap_or(0)
    }

    // Get gifts by organiser
    pub fn get_gifts_by_organiser(env: Env, organiser: Address) -> Vec<GiftInfo> {
        let all_gifts: Vec<GiftInfo> = env
            .storage()
            .instance()
            .get(&DataKey::Gifts)
            .unwrap_or(vec![&env]);

        let mut result: Vec<GiftInfo> = vec![&env];
        for gift in all_gifts.iter() {
            if gift.organiser == organiser {
                result.push_back(gift);
            }
        }
        result
    }
}