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
  Upgraded
} from "../generated/schema"

export function handleAllTimeStatsUpdated(
  event: AllTimeStatsUpdatedEvent
): void {
  let entity = new AllTimeStatsUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.player = event.params.player
  entity.highestGameScore = event.params.highestGameScore
  entity.highestWeeklyScore = event.params.highestWeeklyScore

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

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

export function handleLeaderboardUpdated(event: LeaderboardUpdatedEvent): void {
  let entity = new LeaderboardUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.weekId = event.params.weekId
  entity.topTenCount = event.params.topTenCount

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

export function handleReferralPointsUpdated(
  event: ReferralPointsUpdatedEvent
): void {
  let entity = new ReferralPointsUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.player = event.params.player
  entity.newPoints = event.params.newPoints
  entity.delta = event.params.delta

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRewardClaimed(event: RewardClaimedEvent): void {
  let entity = new RewardClaimed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.player = event.params.player
  entity.totalAmount = event.params.totalAmount
  entity.weekCount = event.params.weekCount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRewardEscrowed(event: RewardEscrowedEvent): void {
  let entity = new RewardEscrowed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.player = event.params.player
  entity.weekId = event.params.weekId
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRewardsDistributed(event: RewardsDistributedEvent): void {
  let entity = new RewardsDistributed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.weekId = event.params.weekId
  entity.totalDistributed = event.params.totalDistributed
  entity.rolloverAmount = event.params.rolloverAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleScoreSubmitted(event: ScoreSubmittedEvent): void {
  let entity = new ScoreSubmitted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.player = event.params.player
  entity.weekId = event.params.weekId
  entity.weeklyScore = event.params.weeklyScore
  entity.gameScore = event.params.gameScore
  entity.gameCount = event.params.gameCount
  entity.rank = event.params.rank

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
