export const formatPostsData = (data) => {
  const posts = [...data];
  const formattedData = [];
  posts.forEach((post) => {
    const {
      available_from,
      description,
      gender,
      id,
      images,
      location,
      posted_by,
      rent,
      title,
    } = post;
    const formattedImages = JSON.parse(images);
    formattedData.push({
      available_from,
      description,
      gender,
      id,
      images: formattedImages,
      location,
      posted_by,
      rent,
      title,
    });
  });

  return formattedData;
};
