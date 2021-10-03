import { useGeoLocation } from "@/composables/useGeolocation";

const mockNavigatorGeolocation = () => {
  const getCurrentPositionMock = jest.fn();

  Object.defineProperty(navigator, "geolocation", {
    value: {
      getCurrentPosition: getCurrentPositionMock,
    },
  });

  return { getCurrentPositionMock };
};
const { getCurrentPositionMock } = mockNavigatorGeolocation();

describe("Geolocation composable", () => {
  it("check if geolocation is supported", () => {
    expect(useGeoLocation().isSupported).toBeDefined();
  });

  it("checks if coordinates matched", () => {
    const data = {
      langtitude: 12,
      longtitude: 10,
    };

    getCurrentPositionMock.mockImplementationOnce((success: any) =>
      success({ coords: data })
    );

    expect(useGeoLocation().coords.value).toMatchObject(data);
  });

  it("checks if errors is defined", () => {
    const data = {
      message: "Geolocation error message",
      code: 1,
    };

    getCurrentPositionMock.mockImplementationOnce((success: any, error: any) =>
      error(data)
    );

    expect(useGeoLocation().error.value).toMatchObject(data);
  });
});
