const sonarURLs = (sonarKey: { front: string; back: string }) => {
  const sonarBadgetURLfront =
    sonarKey?.front &&
    `https://sonarcloud.io/api/project_badges/measure?project=${sonarKey.front}`;
  const sonarURLfront =
    sonarKey?.front &&
    `https://sonarcloud.io/project/overview?id=${sonarKey.front}`;
  const sonarBadgetURLback =
    sonarKey?.back &&
    `https://sonarcloud.io/api/project_badges/measure?project=${sonarKey.back}`;
  const sonarURLback =
    sonarKey?.back &&
    `https://sonarcloud.io/project/overview?id=${sonarKey.back}`;

  return {
    sonarURLfront,
    sonarURLback,
    sonarBadgetURLfront,
    sonarBadgetURLback,
  };
};

export default sonarURLs;
