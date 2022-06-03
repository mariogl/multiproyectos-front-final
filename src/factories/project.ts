import faker from "@faker-js/faker";
import { Factory } from "fishery";
import mongoid from "mongoid-js";
import Project from "../types/project";

const getProject = (blank = false): Project => ({
  id: blank ? "" : mongoid(),
  challenge: blank ? "" : mongoid(),
  name: blank ? "" : faker.name.findName(),
  student: blank ? "" : faker.name.firstName(),
  trello: blank ? "" : faker.internet.url(),
  sonarKey: {
    front: blank ? "" : faker.name.firstName(),
    back: blank ? "" : faker.name.firstName(),
  },
  sonarInfoFront: {
    coverage: blank ? 0 : faker.datatype.number(),
    bugs: blank ? 0 : faker.datatype.number(),
    codeSmells: blank ? 0 : faker.datatype.number(),
    debt: blank ? 0 : faker.datatype.number(),
    securityHotspots: blank ? 0 : faker.datatype.number(),
    vulnerabilities: blank ? 0 : faker.datatype.number(),
  },
  sonarInfoBack: {
    coverage: blank ? 0 : faker.datatype.number(),
    bugs: blank ? 0 : faker.datatype.number(),
    codeSmells: blank ? 0 : faker.datatype.number(),
    debt: blank ? 0 : faker.datatype.number(),
    securityHotspots: blank ? 0 : faker.datatype.number(),
    vulnerabilities: blank ? 0 : faker.datatype.number(),
  },
  repo: {
    back: blank ? "" : faker.internet.url(),
    front: blank ? "" : faker.internet.url(),
  },
  prod: {
    back: blank ? "" : faker.internet.url(),
    front: blank ? "" : faker.internet.url(),
  },
  tutor: {
    id: blank ? "" : mongoid(),
    name: blank ? "" : faker.name.findName(),
  },
});

const projectFactory = Factory.define<Project>(() => getProject());

export const randomProject = (): Project => projectFactory.build();
export const randomProjects = (total = 2): Project[] =>
  projectFactory.buildList(total);
export const blankProject = (): Project => getProject(true);
