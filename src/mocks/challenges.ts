import { Factory } from "fishery";
import { faker } from "@faker-js/faker";
import mongoid from "mongoid-js";
import Challenge from "../types/challenges";

const challengesFactory = Factory.define<Challenge>(() => ({
  id: mongoid(),
  name: faker.name.findName(),
  date: faker.date.soon(),
}));

export const randomChallenge = (): Challenge => challengesFactory.build();
export const randomChallenges = (number = 2): Challenge[] =>
  challengesFactory.buildList(number);
