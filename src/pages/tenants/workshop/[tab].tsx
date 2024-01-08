// ** Next Import
import {
  GetStaticProps,
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next/types";

// ** Demo Components Imports
import WorkshopViewPage from "src/views/workshop/WorkshopViewPage";

const WorkshopView = ({
  tab,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <WorkshopViewPage tab={tab} />;
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [{ params: { tab: "workshop-branches" } }],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = ({
  params,
}: GetStaticPropsContext) => {
  return {
    props: {
      tab: params?.tab,
    },
  };
};

export default WorkshopView;
