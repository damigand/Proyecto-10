const uploadImg = (element) => {
    const file = element?.files[0];
    if (!file) return;

    console.log(file);
};

export default uploadImg;
