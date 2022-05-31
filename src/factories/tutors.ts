import { Factory } from "fishery";
import { faker } from "@faker-js/faker";
import mongoid from "mongoid-js";
import Tutor from "../types/tutor";

const getTutor = (blank = false): Tutor => ({
  id: blank ? "" : mongoid(),
  name: blank ? "" : faker.name.findName(),
});

const tutorFactory = Factory.define<Tutor>(() => getTutor());

export const randomTutor = (): Tutor => tutorFactory.build();
export const randomTutors = (number = 2): Tutor[] =>
  tutorFactory.buildList(number);
export const blankTutor = (): Tutor => getTutor(true);
