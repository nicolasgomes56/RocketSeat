export function routePathBuild(path) {
  const regexParams = /:([a-zA-Z]+)/g;
  const pathWithParams = path.replaceAll(regexParams, '(?<$1>[a-z0-9-_]+)');

  return new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$$`);
}
