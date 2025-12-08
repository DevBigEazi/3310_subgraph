import {
  Player,
  DailyLeaderboardEntry,
  DayStats
} from "../generated/schema"
import { BigInt, Bytes } from "@graphprotocol/graph-ts"

/**
 * Get or create a Player entity
 */
export function getOrCreatePlayer(address: Bytes, timestamp: BigInt): Player {
  let player = Player.load(address)

  if (player == null) {
    player = new Player(address)
    player.highestGameScore = BigInt.fromI32(0)
    player.highestDailyScore = BigInt.fromI32(0)
    player.totalGamesPlayed = BigInt.fromI32(0)
    player.totalReferralPoints = BigInt.fromI32(0)
    player.totalLifetimeScore = BigInt.fromI32(0)
    player.totalRewardsClaimed = BigInt.fromI32(0)
    player.totalRewardsEarned = BigInt.fromI32(0)
    player.firstPlayedAt = timestamp
    player.lastPlayedAt = timestamp
    player.daysPlayed = BigInt.fromI32(0)
    player.save()
  }

  return player
}

/**
 * Get or create a DailyLeaderboardEntry
 */
export function getOrCreateDailyEntry(
  dayId: BigInt,
  playerAddress: Bytes,
  timestamp: BigInt
): DailyLeaderboardEntry {
  let id = dayId.toString() + "-" + playerAddress.toHexString()
  let entry = DailyLeaderboardEntry.load(id)

  if (entry == null) {
    entry = new DailyLeaderboardEntry(id)
    entry.dayId = dayId
    entry.player = playerAddress
    entry.playerAddress = playerAddress
    entry.dailyScore = BigInt.fromI32(0)
    entry.gameScore = BigInt.fromI32(0)
    entry.gameCount = BigInt.fromI32(0)
    entry.referralPoints = BigInt.fromI32(0)
    entry.rank = BigInt.fromI32(0)
    entry.rewardAmount = BigInt.fromI32(0)
    entry.rewardClaimed = false
    entry.lastUpdated = timestamp
    entry.transactionHash = Bytes.empty()
  }

  return entry
}

/**
 * Get or create DayStats
 */
export function getOrCreateDayStats(dayId: BigInt, timestamp: BigInt): DayStats {
  let id = dayId.toString()
  let stats = DayStats.load(id)

  if (stats == null) {
    stats = new DayStats(id)
    stats.dayId = dayId
    stats.topTenCount = BigInt.fromI32(0)
    stats.totalPlayers = BigInt.fromI32(0)
    stats.basePool = BigInt.fromI32(0)
    stats.rolloverAmount = BigInt.fromI32(0)
    stats.totalPool = BigInt.fromI32(0)
    stats.totalDistributed = BigInt.fromI32(0)
    stats.hasDistributed = false
    stats.highestScore = BigInt.fromI32(0)
    stats.totalGamesPlayed = BigInt.fromI32(0)

    // Calculate day boundaries (assuming days start at midnight UTC)
    // This is approximate - adjust based on your genesisTimestamp
    stats.startTimestamp = timestamp
    stats.endTimestamp = timestamp
  }

  return stats
}