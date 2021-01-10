jest.mock("react-native-bootsplash", () => {
    return {
      hide: jest.fn().mockResolvedValueOnce(),
      show: jest.fn().mockResolvedValueOnce(),
      getVisibilityStatus: jest.fn().mockResolvedValue("hidden"),
    };
  });