import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
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
} from "../generated/Play3310V1/Play3310V1"

export function createAllTimeStatsUpdatedEvent(
  player: Address,
  highestGameScore: BigInt,
  highestWeeklyScore: BigInt
): AllTimeStatsUpdated {
  let allTimeStatsUpdatedEvent = changetype<AllTimeStatsUpdated>(newMockEvent())

  allTimeStatsUpdatedEvent.parameters = new Array()

  allTimeStatsUpdatedEvent.parameters.push(
    new ethereum.EventParam("player", ethereum.Value.fromAddress(player))
  )
  allTimeStatsUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "highestGameScore",
      ethereum.Value.fromUnsignedBigInt(highestGameScore)
    )
  )
  allTimeStatsUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "highestWeeklyScore",
      ethereum.Value.fromUnsignedBigInt(highestWeeklyScore)
    )
  )

  return allTimeStatsUpdatedEvent
}

export function createContractUpgradedEvent(
  newImplementation: Address
): ContractUpgraded {
  let contractUpgradedEvent = changetype<ContractUpgraded>(newMockEvent())

  contractUpgradedEvent.parameters = new Array()

  contractUpgradedEvent.parameters.push(
    new ethereum.EventParam(
      "newImplementation",
      ethereum.Value.fromAddress(newImplementation)
    )
  )

  return contractUpgradedEvent
}

export function createInitializedEvent(version: BigInt): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(version)
    )
  )

  return initializedEvent
}

export function createLeaderboardUpdatedEvent(
  weekId: BigInt,
  topTenCount: BigInt
): LeaderboardUpdated {
  let leaderboardUpdatedEvent = changetype<LeaderboardUpdated>(newMockEvent())

  leaderboardUpdatedEvent.parameters = new Array()

  leaderboardUpdatedEvent.parameters.push(
    new ethereum.EventParam("weekId", ethereum.Value.fromUnsignedBigInt(weekId))
  )
  leaderboardUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "topTenCount",
      ethereum.Value.fromUnsignedBigInt(topTenCount)
    )
  )

  return leaderboardUpdatedEvent
}

export function createMinQualificationScoreUpdatedEvent(
  newScore: BigInt
): MinQualificationScoreUpdated {
  let minQualificationScoreUpdatedEvent =
    changetype<MinQualificationScoreUpdated>(newMockEvent())

  minQualificationScoreUpdatedEvent.parameters = new Array()

  minQualificationScoreUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newScore",
      ethereum.Value.fromUnsignedBigInt(newScore)
    )
  )

  return minQualificationScoreUpdatedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent =
    changetype<OwnershipTransferred>(newMockEvent())

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createReferralPointsUpdatedEvent(
  player: Address,
  newPoints: BigInt,
  delta: BigInt
): ReferralPointsUpdated {
  let referralPointsUpdatedEvent =
    changetype<ReferralPointsUpdated>(newMockEvent())

  referralPointsUpdatedEvent.parameters = new Array()

  referralPointsUpdatedEvent.parameters.push(
    new ethereum.EventParam("player", ethereum.Value.fromAddress(player))
  )
  referralPointsUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newPoints",
      ethereum.Value.fromUnsignedBigInt(newPoints)
    )
  )
  referralPointsUpdatedEvent.parameters.push(
    new ethereum.EventParam("delta", ethereum.Value.fromUnsignedBigInt(delta))
  )

  return referralPointsUpdatedEvent
}

export function createRewardClaimedEvent(
  player: Address,
  totalAmount: BigInt,
  weekCount: BigInt
): RewardClaimed {
  let rewardClaimedEvent = changetype<RewardClaimed>(newMockEvent())

  rewardClaimedEvent.parameters = new Array()

  rewardClaimedEvent.parameters.push(
    new ethereum.EventParam("player", ethereum.Value.fromAddress(player))
  )
  rewardClaimedEvent.parameters.push(
    new ethereum.EventParam(
      "totalAmount",
      ethereum.Value.fromUnsignedBigInt(totalAmount)
    )
  )
  rewardClaimedEvent.parameters.push(
    new ethereum.EventParam(
      "weekCount",
      ethereum.Value.fromUnsignedBigInt(weekCount)
    )
  )

  return rewardClaimedEvent
}

export function createRewardEscrowedEvent(
  player: Address,
  weekId: BigInt,
  amount: BigInt
): RewardEscrowed {
  let rewardEscrowedEvent = changetype<RewardEscrowed>(newMockEvent())

  rewardEscrowedEvent.parameters = new Array()

  rewardEscrowedEvent.parameters.push(
    new ethereum.EventParam("player", ethereum.Value.fromAddress(player))
  )
  rewardEscrowedEvent.parameters.push(
    new ethereum.EventParam("weekId", ethereum.Value.fromUnsignedBigInt(weekId))
  )
  rewardEscrowedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return rewardEscrowedEvent
}

export function createRewardsDistributedEvent(
  weekId: BigInt,
  totalDistributed: BigInt,
  rolloverAmount: BigInt
): RewardsDistributed {
  let rewardsDistributedEvent = changetype<RewardsDistributed>(newMockEvent())

  rewardsDistributedEvent.parameters = new Array()

  rewardsDistributedEvent.parameters.push(
    new ethereum.EventParam("weekId", ethereum.Value.fromUnsignedBigInt(weekId))
  )
  rewardsDistributedEvent.parameters.push(
    new ethereum.EventParam(
      "totalDistributed",
      ethereum.Value.fromUnsignedBigInt(totalDistributed)
    )
  )
  rewardsDistributedEvent.parameters.push(
    new ethereum.EventParam(
      "rolloverAmount",
      ethereum.Value.fromUnsignedBigInt(rolloverAmount)
    )
  )

  return rewardsDistributedEvent
}

export function createScoreSubmittedEvent(
  player: Address,
  weekId: BigInt,
  weeklyScore: BigInt,
  gameScore: BigInt,
  gameCount: BigInt,
  rank: BigInt
): ScoreSubmitted {
  let scoreSubmittedEvent = changetype<ScoreSubmitted>(newMockEvent())

  scoreSubmittedEvent.parameters = new Array()

  scoreSubmittedEvent.parameters.push(
    new ethereum.EventParam("player", ethereum.Value.fromAddress(player))
  )
  scoreSubmittedEvent.parameters.push(
    new ethereum.EventParam("weekId", ethereum.Value.fromUnsignedBigInt(weekId))
  )
  scoreSubmittedEvent.parameters.push(
    new ethereum.EventParam(
      "weeklyScore",
      ethereum.Value.fromUnsignedBigInt(weeklyScore)
    )
  )
  scoreSubmittedEvent.parameters.push(
    new ethereum.EventParam(
      "gameScore",
      ethereum.Value.fromUnsignedBigInt(gameScore)
    )
  )
  scoreSubmittedEvent.parameters.push(
    new ethereum.EventParam(
      "gameCount",
      ethereum.Value.fromUnsignedBigInt(gameCount)
    )
  )
  scoreSubmittedEvent.parameters.push(
    new ethereum.EventParam("rank", ethereum.Value.fromUnsignedBigInt(rank))
  )

  return scoreSubmittedEvent
}

export function createUpgradedEvent(implementation: Address): Upgraded {
  let upgradedEvent = changetype<Upgraded>(newMockEvent())

  upgradedEvent.parameters = new Array()

  upgradedEvent.parameters.push(
    new ethereum.EventParam(
      "implementation",
      ethereum.Value.fromAddress(implementation)
    )
  )

  return upgradedEvent
}
