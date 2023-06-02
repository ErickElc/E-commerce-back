function formatPublicData(data) {
  const userData = {
    _id: data._id,
    name: data.name,
    age: data.age,
    email: data.email,
    phoneNumber: data.phoneNumber,
    createdDate: data.createdDate,
  };
  return userData;
}

module.exports = formatPublicData;
