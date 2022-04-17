import { Factory } from "fishery";
import { faker } from "@faker-js/faker";
import mongoid from "mongoid-js";
import Challenge from "../types/challenges";

const getChallenge = (blank = false): Challenge => ({
  id: blank ? "" : mongoid(),
  name: blank ? "" : faker.name.findName(),
  date: faker.date.recent(),
});

const challengeFactory = Factory.define<Challenge>(() => getChallenge());

export const randomChallenge = (): Challenge => challengeFactory.build();
export const randomChallenges = (number = 2): Challenge[] =>
  challengeFactory.buildList(number);
export const blankChallenge = (): Challenge => getChallenge(true);
