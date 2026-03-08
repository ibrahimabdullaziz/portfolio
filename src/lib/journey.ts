export function getJourneyContent() {
  try {
    return null;
  } catch (error) {
    console.error('Error reading journey.mdx', error);
    return null;
  }
}

const journeyLib = { getJourneyContent };

export default journeyLib;
