// Mock API implementation
export const addQuestion = async (questionData) => {
  // In a real app, this would call your backend
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        status: 'success',
        data: questionData
      });
    }, 500);
  });
};