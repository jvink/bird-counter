const TIME_THRESHOLD = 3; // seconds between detections
let lastDetection = null; // will store {time, centroid}

const isDuplicate = (centroid) => {
  if (!lastDetection) return false;
  if (!centroid || !Array.isArray(centroid)) return false;

  const now = new Date();
  const timeDuplicate =
    now - new Date(lastDetection.time) < TIME_THRESHOLD * 1000;

  const centroidDuplicate =
    lastDetection.centroid &&
    Array.isArray(lastDetection.centroid) &&
    lastDetection.centroid[0] === centroid[0] &&
    lastDetection.centroid[1] === centroid[1];

  return timeDuplicate || centroidDuplicate;
};

const updateLastDetection = (timestamp, centroid) => {
  lastDetection = {
    time: timestamp,
    centroid: centroid,
  };
};

module.exports = {
  isDuplicate,
  updateLastDetection,
  TIME_THRESHOLD,
};
