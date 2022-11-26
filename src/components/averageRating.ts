export const averageRating = (fav: any, comments: any, views: any) => {
  const average = Math.round(
    ((fav.favorites + comments.comments) / views.views) * 100,
  );

  console.log(average);
  return average;
};
