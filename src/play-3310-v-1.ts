import {
  AllTimeStatsUpdated as AllTimeStatsUpdatedEvent,
  ContractUpgraded as ContractUpgradedEvent,
  Initialized as InitializedEvent,
  LeaderboardUpdated as LeaderboardUpdatedEvent,
  MinQualificationScoreUpdated as MinQualificationScoreUpdatedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  ReferralPointsUpdated as ReferralPointsUpdatedEvent,
  RewardClaimed as RewardClaimedEvent,
  RewardEscrowed as RewardEscrowedEvent,
  RewardsDistributed as RewardsDistributedEvent,
  ScoreSubmitted as ScoreSubmittedEvent,
  Upgraded as UpgradedEvent
} from "../generated/Play3310V1/Play3310V1"
import {
  AllTimeStatsUpdated,
  ContractUpgraded,
  Initialized,
  LeaderboardUpdated,
  MinQualificationScoreUpdated,
  OwnershipTransferred,
  ReferralPointsUpdated,
  RewardClaimed,
  RewardEscrowed,
  RewardsDistributed,
  ScoreSubmitted,
  Upgraded,
  Player,
  DailyLeaderboardEntry,
  DayStats
} from "../generated/schema"
import { BigInt, Bytes } from "@graphprotocol/graph-ts"

// ==================== HELPER FUNCTIONS ====================

/**
 * Get or create a Player entity
 */
function getOrCreatePlayer(address: Bytes, timestamp: BigInt): Player {
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
function getOrCreateDailyEntry(
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
function getOrCreateDayStats(dayId: BigInt, timestamp: BigInt): DayStats {
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

// ==================== EVENT HANDLERS ====================

export function handleScoreSubmitted(event: ScoreSubmittedEvent): void {
  // Save immutable event (using ABI parameter names: weekId, weeklyScore)
  let eventEntity = new ScoreSubmitted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  eventEntity.player = event.params.player
  eventEntity.dayId = event.params.weekId // ABI uses weekId
  eventEntity.dailyScore = event.params.weeklyScore // ABI uses weeklyScore
  eventEntity.gameScore = event.params.gameScore
  eventEntity.gameCount = event.params.gameCount
  eventEntity.rank = event.params.rank
  eventEntity.blockNumber = event.block.number
  eventEntity.blockTimestamp = event.block.timestamp
  eventEntity.transactionHash = event.transaction.hash
  eventEntity.save()

  // Update Player entity
  let player = getOrCreatePlayer(event.params.player, event.block.timestamp)

  // Check if this is a new day for the player
  let dailyEntry = getOrCreateDailyEntry(
    event.params.weekId, // ABI uses weekId
    event.params.player,
    event.block.timestamp
  )

  let isNewDay = dailyEntry.gameCount.equals(BigInt.fromI32(0))
  if (isNewDay) {
    player.daysPlayed = player.daysPlayed.plus(BigInt.fromI32(1))
  }

  player.lastPlayedAt = event.block.timestamp
  player.save()

  // Update DailyLeaderboardEntry
  dailyEntry.dailyScore = event.params.weeklyScore // ABI uses weeklyScore
  dailyEntry.gameScore = event.params.gameScore
  dailyEntry.gameCount = event.params.gameCount
  dailyEntry.rank = event.params.rank
  dailyEntry.lastUpdated = event.block.timestamp
  dailyEntry.transactionHash = event.transaction.hash
  dailyEntry.save()

  // Update DayStats
  let dayStats = getOrCreateDayStats(event.params.weekId, event.block.timestamp) // ABI uses weekId

  if (isNewDay) {
    dayStats.totalPlayers = dayStats.totalPlayers.plus(BigInt.fromI32(1))
  }

  // Update highest score for the day
  if (event.params.weeklyScore.gt(dayStats.highestScore)) { // ABI uses weeklyScore
    dayStats.highestScore = event.params.weeklyScore
  }

  dayStats.totalGamesPlayed = dayStats.totalGamesPlayed.plus(event.params.gameCount)
  dayStats.save()
}

export function handleAllTimeStatsUpdated(
  event: AllTimeStatsUpdatedEvent
): void {
  // Save immutable event (using ABI parameter names: highestWeeklyScore)
  let eventEntity = new AllTimeStatsUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  eventEntity.player = event.params.player
  eventEntity.highestGameScore = event.params.highestGameScore
  eventEntity.highestDailyScore = event.params.highestWeeklyScore // ABI uses highestWeeklyScore
  eventEntity.blockNumber = event.block.number
  eventEntity.blockTimestamp = event.block.timestamp
  eventEntity.transactionHash = event.transaction.hash
  eventEntity.save()

  // Update Player entity
  let player = getOrCreatePlayer(event.params.player, event.block.timestamp)
  player.highestGameScore = event.params.highestGameScore
  player.highestDailyScore = event.params.highestWeeklyScore // ABI uses highestWeeklyScore
  player.save()
}

export function handleLeaderboardUpdated(event: LeaderboardUpdatedEvent): void {
  // Save immutable event (using ABI parameter names: weekId)
  let eventEntity = new LeaderboardUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  eventEntity.dayId = event.params.weekId // ABI uses weekId
  eventEntity.topTenCount = event.params.topTenCount
  eventEntity.blockNumber = event.block.number
  eventEntity.blockTimestamp = event.block.timestamp
  eventEntity.transactionHash = event.transaction.hash
  eventEntity.save()

  // Update DayStats
  let dayStats = getOrCreateDayStats(event.params.weekId, event.block.timestamp) // ABI uses weekId
  dayStats.topTenCount = event.params.topTenCount
  dayStats.save()
}

export function handleRewardEscrowed(event: RewardEscrowedEvent): void {
  // Save immutable event (using ABI parameter names: weekId)
  let eventEntity = new RewardEscrowed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  eventEntity.player = event.params.player
  eventEntity.dayId = event.params.weekId // ABI uses weekId
  eventEntity.amount = event.params.amount
  eventEntity.blockNumber = event.block.number
  eventEntity.blockTimestamp = event.block.timestamp
  eventEntity.transactionHash = event.transaction.hash
  eventEntity.save()

  // Update DailyLeaderboardEntry
  let dailyEntry = getOrCreateDailyEntry(
    event.params.weekId, // ABI uses weekId
    event.params.player,
    event.block.timestamp
  )
  dailyEntry.rewardAmount = event.params.amount
  dailyEntry.save()

  // Update Player
  let player = getOrCreatePlayer(event.params.player, event.block.timestamp)
  player.totalRewardsEarned = player.totalRewardsEarned.plus(event.params.amount)
  player.save()
}

export function handleRewardClaimed(event: RewardClaimedEvent): void {
  // Save immutable event (using ABI parameter names: weekCount)
  let eventEntity = new RewardClaimed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  eventEntity.player = event.params.player
  eventEntity.totalAmount = event.params.totalAmount
  eventEntity.dayCount = event.params.weekCount // ABI uses weekCount
  eventEntity.blockNumber = event.block.number
  eventEntity.blockTimestamp = event.block.timestamp
  eventEntity.transactionHash = event.transaction.hash
  eventEntity.save()

  // Update Player
  let player = getOrCreatePlayer(event.params.player, event.block.timestamp)
  player.totalRewardsClaimed = player.totalRewardsClaimed.plus(event.params.totalAmount)
  player.save()

  // Note: We can't easily determine which specific days were claimed without more data
  // If you need to track individual day claims, you'd need to emit more detailed events
}

export function handleRewardsDistributed(event: RewardsDistributedEvent): void {
  // Save immutable event (using ABI parameter names: weekId)
  let eventEntity = new RewardsDistributed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  eventEntity.dayId = event.params.weekId // ABI uses weekId
  eventEntity.totalDistributed = event.params.totalDistributed
  eventEntity.rolloverAmount = event.params.rolloverAmount
  eventEntity.blockNumber = event.block.number
  eventEntity.blockTimestamp = event.block.timestamp
  eventEntity.transactionHash = event.transaction.hash
  eventEntity.save()

  // Update DayStats
  let dayStats = getOrCreateDayStats(event.params.weekId, event.block.timestamp) // ABI uses weekId
  dayStats.totalDistributed = event.params.totalDistributed
  dayStats.rolloverAmount = event.params.rolloverAmount
  dayStats.hasDistributed = true
  dayStats.save()
}

export function handleReferralPointsUpdated(
  event: ReferralPointsUpdatedEvent
): void {
  // Save immutable event
  let eventEntity = new ReferralPointsUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  eventEntity.player = event.params.player
  eventEntity.newPoints = event.params.newPoints
  eventEntity.delta = event.params.delta
  eventEntity.blockNumber = event.block.number
  eventEntity.blockTimestamp = event.block.timestamp
  eventEntity.transactionHash = event.transaction.hash
  eventEntity.save()

  // Update Player
  let player = getOrCreatePlayer(event.params.player, event.block.timestamp)
  player.totalReferralPoints = event.params.newPoints
  player.save()
}

// ==================== OTHER EVENT HANDLERS ====================

export function handleContractUpgraded(event: ContractUpgradedEvent): void {
  let entity = new ContractUpgraded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newImplementation = event.params.newImplementation
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.save()
}

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.version = event.params.version
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.save()
}

export function handleMinQualificationScoreUpdated(
  event: MinQualificationScoreUpdatedEvent
): void {
  let entity = new MinQualificationScoreUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newScore = event.params.newScore
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.save()
}

export function handleUpgraded(event: UpgradedEvent): void {
  let entity = new Upgraded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.implementation = event.params.implementation
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.save()
}
