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
    const { locate, coords } = useGeoLocation();
    const data = {
      latitude: 12,
      longitude: 10,
    };

    getCurrentPositionMock.mockImplementationOnce((success: any) =>
      success({ coords: data })
    );
    locate();

    expect(coords.value).toMatchObject({
      lat: 12,
      lon: 10,
    });
  });

  it("checks if errors is defined", () => {
    const { locate, error } = useGeoLocation();
    const data = {
      message: "Geolocation error message",
      code: 1,
    };

    getCurrentPositionMock.mockImplementationOnce((success: any, error: any) =>
      error(data)
    );
    locate();

    expect(error.value).toMatchObject(data);
  });
});
