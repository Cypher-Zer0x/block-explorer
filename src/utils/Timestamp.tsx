export const timeSince = (timestamp: string) => {
  const date = new Date(Number(timestamp));
  const now = new Date();
  const timeElapsedInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  let timeElapsedText = "";

  if (timeElapsedInSeconds < 60) {
      timeElapsedText = `${timeElapsedInSeconds} secs ago`;
  } else if (timeElapsedInSeconds < 3600) {
      timeElapsedText = `${Math.floor(timeElapsedInSeconds / 60)} mins ago`;
  } else if (timeElapsedInSeconds < 86400) {
      timeElapsedText = `${Math.floor(timeElapsedInSeconds / 3600)} hours ago`;
  } else {
      timeElapsedText = `${Math.floor(timeElapsedInSeconds / 86400)} days ago`;
  }

  const formattedDate = date.toUTCString().replace('GMT', '+UTC');


  return `${timeElapsedText} (${formattedDate})`;
};
