#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype, token,
     Address, Env, String, Vec, vec,
};

#[contracttype]
#[derive(Clone)]
pub struct GiftDrop {
    pub id: u64,
    pub organiser: Address,
    pub recipient: Address,
    pub target_amount: i128,
    pub current_amount: i128,
    pub deadline: u64,
    pub reveal_date: u64,
    pub is_released: bool,
    pub is_refunded: bool,
    pub occasion: String,
    pub message: String,
    pub max_contribution: i128,
}

#[contracttype]
#[derive(Clone)]
pub struct Contribution {
    pub contributor: Address,
    pub amount: i128,
    pub timestamp: u64,
}

#[contracttype]
pub enum DataKey {
    GiftCount,
    Gift(u64),
    Contributors(u64),
    OrganizerGifts(Address),
    ContributorGifts(Address),
}

#[contract]
pub struct GiftDropContract;

#[contractimpl]
impl GiftDropContract {

    // Create a new gift drop
    pub fn create_gift(
        env: Env,
        organiser: Address,
        recipient: Address,
        target_amount: i128,
        deadline: u64,
        reveal_date: u64,
        occasion: String,
        message: String,
        max_contribution: i128,
    ) -> u64 {
        organiser.require_auth();

        // Get next ID
        let id: u64 = env.storage().instance()
            .get(&DataKey::GiftCount)
            .unwrap_or(0);
        let next_id = id + 1;

        // Store gift
        let gift = GiftDrop {
            id: next_id,
            organiser: organiser.clone(),
            recipient,
            target_amount,
            current_amount: 0,
            deadline,
            reveal_date,
            is_released: false,
            is_refunded: false,
            occasion,
            message,
            max_contribution,
        };

        env.storage().instance().set(&DataKey::Gift(next_id), &gift);
        env.storage().instance().set(&DataKey::GiftCount, &next_id);

        // Initialize contributors list
        let contributors: Vec<Contribution> = vec![&env];
        env.storage().instance().set(&DataKey::Contributors(next_id), &contributors);

        // Track organizer's gifts
        let mut org_gifts: Vec<u64> = env.storage().instance()
            .get(&DataKey::OrganizerGifts(organiser.clone()))
            .unwrap_or(vec![&env]);
        org_gifts.push_back(next_id);
        env.storage().instance().set(&DataKey::OrganizerGifts(organiser), &org_gifts);

        next_id
    }

    // Contribute to a gift drop
    pub fn contribute(
        env: Env,
        gift_id: u64,
        contributor: Address,
        amount: i128,
        token_address: Address,
    ) {
        contributor.require_auth();

        let mut gift: GiftDrop = env.storage().instance()
            .get(&DataKey::Gift(gift_id))
            .unwrap();

        assert!(!gift.is_released, "Already released");
        assert!(!gift.is_refunded, "Already refunded");
        assert!(env.ledger().timestamp() < gift.deadline, "Deadline passed");
        assert!(amount > 0, "Amount must be positive");

        // Check max contribution limit per user
        if gift.max_contribution > 0 {
            let existing_contributions: Vec<Contribution> = env.storage().instance()
                .get(&DataKey::Contributors(gift_id))
                .unwrap_or(vec![&env]);
            let mut user_total: i128 = 0;
            for c in existing_contributions.iter() {
                if c.contributor == contributor {
                    user_total += c.amount;
                }
            }
            assert!(
                user_total + amount <= gift.max_contribution,
                "Exceeds max contribution limit"
            );
        }

        // Transfer tokens
        let token_client = token::Client::new(&env, &token_address);
        token_client.transfer(
            &contributor,
            &env.current_contract_address(),
            &amount,
        );

        // Update gift amount
        gift.current_amount += amount;
        env.storage().instance().set(&DataKey::Gift(gift_id), &gift);

        // Add contribution
        let contribution = Contribution {
            contributor: contributor.clone(),
            amount,
            timestamp: env.ledger().timestamp(),
        };
        let mut contributors: Vec<Contribution> = env.storage().instance()
            .get(&DataKey::Contributors(gift_id))
            .unwrap();
        contributors.push_back(contribution);
        env.storage().instance().set(&DataKey::Contributors(gift_id), &contributors);

        // Track contributor's gifts
        let mut contrib_gifts: Vec<u64> = env.storage().instance()
            .get(&DataKey::ContributorGifts(contributor.clone()))
            .unwrap_or(vec![&env]);
        if !contrib_gifts.contains(&gift_id) {
            contrib_gifts.push_back(gift_id);
            env.storage().instance().set(
                &DataKey::ContributorGifts(contributor),
                &contrib_gifts
            );
        }

        
    }

    // Release funds to recipient
    pub fn release(env: Env, gift_id: u64, token_address: Address) {
        let mut gift: GiftDrop = env.storage().instance()
            .get(&DataKey::Gift(gift_id))
            .unwrap();

        assert!(!gift.is_released, "Already released");
        assert!(gift.current_amount >= gift.target_amount, "Target not reached");

        let token_client = token::Client::new(&env, &token_address);
        token_client.transfer(
            &env.current_contract_address(),
            &gift.recipient,
            &gift.current_amount,
        );

        gift.is_released = true;
        env.storage().instance().set(&DataKey::Gift(gift_id), &gift);
    }

    // Refund contributors
    pub fn refund(env: Env, gift_id: u64, token_address: Address) {
        let mut gift: GiftDrop = env.storage().instance()
            .get(&DataKey::Gift(gift_id))
            .unwrap();

        assert!(!gift.is_refunded, "Already refunded");
        assert!(!gift.is_released, "Already released");
        assert!(env.ledger().timestamp() > gift.deadline, "Deadline not passed");
        assert!(gift.current_amount < gift.target_amount, "Target was reached");

        let contributors: Vec<Contribution> = env.storage().instance()
            .get(&DataKey::Contributors(gift_id))
            .unwrap();

        let token_client = token::Client::new(&env, &token_address);

        for contribution in contributors.iter() {
            token_client.transfer(
                &env.current_contract_address(),
                &contribution.contributor,
                &contribution.amount,
            );
        }

        gift.is_refunded = true;
        env.storage().instance().set(&DataKey::Gift(gift_id), &gift);
    }

    // Get a gift drop
    pub fn get_gift(env: Env, gift_id: u64) -> GiftDrop {
        env.storage().instance()
            .get(&DataKey::Gift(gift_id))
            .unwrap()
    }

    // Get contributors for a gift
    pub fn get_contributors(env: Env, gift_id: u64) -> Vec<Contribution> {
        env.storage().instance()
            .get(&DataKey::Contributors(gift_id))
            .unwrap_or(vec![&env])
    }

    // Get total gift count
    pub fn get_gift_count(env: Env) -> u64 {
        env.storage().instance()
            .get(&DataKey::GiftCount)
            .unwrap_or(0)
    }

    // Get gifts by organizer
    pub fn get_organizer_gifts(env: Env, organiser: Address) -> Vec<u64> {
        env.storage().instance()
            .get(&DataKey::OrganizerGifts(organiser))
            .unwrap_or(vec![&env])
    }

    // Get gifts by contributor
    pub fn get_contributor_gifts(env: Env, contributor: Address) -> Vec<u64> {
        env.storage().instance()
            .get(&DataKey::ContributorGifts(contributor))
            .unwrap_or(vec![&env])
    }
}