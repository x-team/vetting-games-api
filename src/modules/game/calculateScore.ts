type PartialGame = {
  id: string;
  mission: {
    bugs: {
      id: number;
      realBug: boolean;
    }[];
  };
  bugs: {
    bugId: number;
  }[];
};

/**
 * Calculates the score of a game based on the bugs selected by the user saved in BugOnGame.
 * Takes the total number of bugs in the mission and the number of bugs selected by the user
 * and calculates the score based on the following formula:
 *
 * Score = (correct answers - wrong answers) / real bugs
 *
 * If the mission has no bugs, the score is 1.
 *
 * @param game
 * @returns `score` Number between `0` and `1` where `1` is the best score.
 */
export default function calculateGameScore(game: PartialGame): number {
  const realBugList =
    game.mission.bugs?.filter((bug) => bug.realBug).map((bug) => bug.id) || [];
  const realBugs = realBugList.length;

  if (realBugs === 0) {
    return 1;
  }

  const selectedBugs = game.bugs?.map((bug) => bug.bugId) || [];

  const correctBugs = selectedBugs.filter((bug) =>
    realBugList.includes(bug)
  ).length;
  const wrongBugs = selectedBugs.filter(
    (bug) => !realBugList.includes(bug)
  ).length;

  if (correctBugs - wrongBugs < 0) {
    return 0;
  }

  return (correctBugs - wrongBugs) / realBugs;
}
