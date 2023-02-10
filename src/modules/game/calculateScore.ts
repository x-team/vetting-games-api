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
export default function calculateGameScore(
  bugs: number[],
  picked: number[]
): number {
  const totalBugs = bugs.length;

  if (totalBugs === 0) return 1;

  const { correct, wrong } = bugs.reduce(
    (acc, bug) => {
      const isCorrect = picked.includes(bug);

      return {
        ...acc,
        correct: acc.correct + (isCorrect ? 1 : 0),
        wrong: acc.wrong + (isCorrect ? 0 : 1),
      };
    },
    { correct: 0, wrong: 0 }
  );

  if (correct - wrong < 0) {
    return 0;
  }

  return (correct - wrong) / totalBugs;
}
