import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { AllTimeStatsUpdated } from "../generated/schema"
import { AllTimeStatsUpdated as AllTimeStatsUpdatedEvent } from "../generated/Play3310V1/Play3310V1"
import { handleAllTimeStatsUpdated } from "../src/play-3310-v-1"
import { createAllTimeStatsUpdatedEvent } from "./play-3310-v-1-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#tests-structure

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let player = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let highestGameScore = BigInt.fromI32(234)
    let highestWeeklyScore = BigInt.fromI32(234)
    let newAllTimeStatsUpdatedEvent = createAllTimeStatsUpdatedEvent(
      player,
      highestGameScore,
      highestWeeklyScore
    )
    handleAllTimeStatsUpdated(newAllTimeStatsUpdatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#write-a-unit-test

  test("AllTimeStatsUpdated created and stored", () => {
    assert.entityCount("AllTimeStatsUpdated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AllTimeStatsUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "player",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AllTimeStatsUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "highestGameScore",
      "234"
    )
    assert.fieldEquals(
      "AllTimeStatsUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "highestWeeklyScore",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#asserts
  })
})
