# 3310 Game Subgraph Setup Guide

## Overview

This subgraph indexes the Play3310V1 smart contract on Celo Sepolia, tracking both daily leaderboards and all-time player statistics.

## Prerequisites

- Node.js and yarn installed
- The Graph CLI installed globally: `npm install -g @graphprotocol/graph-cli`

## Setup Steps

### 1. Install Dependencies

```bash
cd /Users/macuser/Desktop/workspace/3310_game/subgraph
yarn install
```

### 2. Generate TypeScript Types

After any schema changes, regenerate the types:

```bash
yarn codegen
```

This will generate TypeScript classes for all entities defined in `schema.graphql`.

### 3. Build the Subgraph

```bash
yarn build
```

### 4. Deploy to The Graph Studio

#### First-time deployment:

```bash
graph auth --studio <YOUR_DEPLOY_KEY>
graph deploy --studio 3310-game
```

#### Subsequent deployments:

```bash
yarn deploy
```

## Development Workflow

### After Schema Changes

1. Update `schema.graphql`
2. Update handlers in `src/play-3310-v-1.ts`
3. Run `yarn codegen` to regenerate types
4. Run `yarn build` to compile
5. Run `yarn deploy` to deploy

### Testing Locally

You can run a local Graph Node for testing:

```bash
# Start local Graph Node (requires Docker)
docker-compose up

# Create local subgraph
yarn create-local

# Deploy to local node
yarn deploy-local
```

## Key Files

- **schema.graphql**: Defines all entities (data models)
- **subgraph.yaml**: Subgraph manifest (contract address, events, handlers)
- **src/play-3310-v-1.ts**: Event handlers that populate entities
- **abis/Play3310V1.json**: Contract ABI

## Entity Structure

### Aggregated Entities (Queryable)

- **Player**: All-time stats for each player
- **DailyLeaderboardEntry**: Player performance per day
- **DayStats**: Daily statistics and reward pools

### Event Entities (Immutable logs)

- ScoreSubmitted
- AllTimeStatsUpdated
- LeaderboardUpdated
- RewardEscrowed
- RewardClaimed
- RewardsDistributed
- ReferralPointsUpdated
- etc.

## Query Examples

See `QUERY_EXAMPLES.md` for comprehensive GraphQL query examples.

### Quick Example: Get Top 10 All-Time

```graphql
{
  players(orderBy: totalLifetimeScore, orderDirection: desc, first: 10) {
    id
    totalLifetimeScore
    highestGameScore
    daysPlayed
  }
}
```

### Quick Example: Get Today's Leaderboard

```graphql
{
  dailyLeaderboardEntries(
    where: { dayId: "1", rank_gt: 0 }
    orderBy: rank
    orderDirection: asc
    first: 10
  ) {
    rank
    playerAddress
    dailyScore
    gameScore
  }
}
```

## Troubleshooting

### Codegen Errors

If you see TypeScript errors about missing types:

```bash
yarn codegen
```

### Build Errors

Clear generated files and rebuild:

```bash
rm -rf generated/
yarn codegen
yarn build
```

### Sync Issues

If the subgraph is not syncing:

1. Check the contract address in `subgraph.yaml`
2. Verify the startBlock is correct
3. Check The Graph Studio for error logs

## Contract Information

- **Network**: Celo Sepolia
- **Contract Address**: `0x67648938d99bd1809987F18a09f427D8da6C88fd`
- **Start Block**: 10647621

## Resources

- [The Graph Documentation](https://thegraph.com/docs/)
- [AssemblyScript API](https://thegraph.com/docs/en/developing/assemblyscript-api/)
- [Subgraph Studio](https://thegraph.com/studio/)
