import Head from 'next/head';
import SearchArea from 'containers/Home/Search/Search';
import LocationGrid from 'containers/Home/Location/Location';
import { getAPIData } from 'library/helpers/get-api-data';
import { getDeviceType } from 'library/helpers/get-device-type';
import {
  HOME_PAGE_SECTIONS_ITEM_LIMIT_FOR_MOBILE_DEVICE,
  HOME_PAGE_SECTIONS_ITEM_LIMIT_FOR_TABLET_DEVICE,
  HOME_PAGE_SECTIONS_ITEM_LIMIT_FOR_DESKTOP_DEVICE,
  HOME_PAGE_SECTIONS_COLUMNS_RESPONSIVE_WIDTH,
} from 'settings/config';
export default function HomePage({
  deviceType,
  locationData,
}) {
  let limit;

  if (deviceType === 'mobile') {
    limit = HOME_PAGE_SECTIONS_ITEM_LIMIT_FOR_MOBILE_DEVICE;
  }
  if (deviceType === 'tablet') {
    limit = HOME_PAGE_SECTIONS_ITEM_LIMIT_FOR_TABLET_DEVICE;
  }

  if (deviceType === 'desktop') {
    limit = HOME_PAGE_SECTIONS_ITEM_LIMIT_FOR_DESKTOP_DEVICE;
  }
  return (
    <>
      <Head>
        <title>채용</title>
      </Head>
      <SearchArea />
      <LocationGrid data={locationData} deviceType={deviceType} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const apiUrl = [
    {
      endpoint: 'hotel',
      name: 'luxaryHotelData',
    },
    {
      endpoint: 'top-hotel',
      name: 'topHotelData',
    },
    {
      endpoint: 'location',
      name: 'locationData',
    },
  ];
  const deviceType = getDeviceType(req);
  const pageData = await getAPIData(apiUrl);
  let locationData = [],
    topHotelData = [],
    luxaryHotelData = [];

  if (pageData) {
    pageData.forEach((item, key) => {
      if (item.name === 'locationData') {
        locationData = item.data ? [...item.data] : [];
      } else if (item.name === 'topHotelData') {
        topHotelData = item.data ? [...item.data] : [];
      } else if (item.name === 'luxaryHotelData') {
        luxaryHotelData = item.data ? [...item.data] : [];
      }
    });
  }
  return {
    props: { deviceType, locationData, topHotelData, luxaryHotelData },
  };
}
