import {AppDataSource} from "./data-source";
import {Player} from "./entities/player.entity";

export async function db_select_player_all_data(userId: string): Promise<Player | null> {
    return await AppDataSource
        .createQueryBuilder()
        .select('player')
        .from(Player, 'player')
        .where('player.userId = :userId', {userId})
        .getOne();
}

export async function db_select_player_bankBalance(userId: string): Promise<number> {
    const result = await AppDataSource
        .createQueryBuilder()
        .select('player.bankBalance')
        .from(Player, 'player')
        .where('player.userId = :userId', {userId})
        .getOne();

    return result?.bankBalance ?? 0;
}

export async function db_update_player_bankBalance(userId: string, newBankBalance: number): Promise<void> {
    await AppDataSource
        .createQueryBuilder()
        .update(Player)
        .set({bankBalance: newBankBalance})
        .where('userId = :userId', {userId})
        .execute();
}

export async function db_select_player_damageBalance(userId: string): Promise<number> {
    const result = await AppDataSource
        .createQueryBuilder()
        .select('player.damageBalance')
        .from(Player, 'player')
        .where('player.userId = :userId', {userId})
        .getOne();

    return result?.damageBalance ?? 0;
}

export async function db_update_player_damageBalance(userId: string, newDamageBalance: number): Promise<void> {
    await AppDataSource
        .createQueryBuilder()
        .update(Player)
        .set({damageBalance: newDamageBalance})
        .where('userId = :userId', {userId})
        .execute();
}

export async function db_update_player_woundsMathLevel(userId: string, woundsMathLevel: number): Promise<void> {
    await AppDataSource
        .createQueryBuilder()
        .update(Player)
        .set({woundsMathLevel: woundsMathLevel})
        .where('userId = :userId', {userId})
        .execute();
}