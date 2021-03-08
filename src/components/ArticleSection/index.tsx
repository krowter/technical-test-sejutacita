import { useState } from "react";
import getConfig from "next/config";
import { connect } from "react-redux";
import { Waypoint } from "react-waypoint";

import { AdvertisingCard } from "blocks/ArticleCard/Card";
import {
  ArticleSectionContainer,
  SectionContainer,
} from "components/ArticleSection/Containers";
import { TemplateSection } from "components/ArticleSection/TemplateSection";

import { openTab as _openTab } from "redux/actions/tabAction";
import { TabsState } from "redux/reducers/tabReducer";

const {
  publicRuntimeConfig: { advertisementImagePlaceholder },
} = getConfig();

const _ArticleSection = ({ templates, tabs }: any) => {
  const [templatesPerPage, setTemplatesPerPage] = useState(8);

  return (
    <ArticleSectionContainer mounted={tabs.loading}>
      {templates
        .slice(0, templatesPerPage)
        .map((template: any, index: number) => {
          const isAdvertising =
            template.sections[0]?.articles[0]?.source === "AD";
          const hasTemplateTitle = Boolean(template.title);

          if (isAdvertising)
            return (
              <AdvertisingCard
                key={template.id}
                backgroundImage={advertisementImagePlaceholder}
              >
                Iklan
              </AdvertisingCard>
            );

          return (
            <div key={template.id}>
              {index === templatesPerPage - 1 && (
                /* load the next 4 templates once this one enters viewport */
                <Waypoint
                  onEnter={() =>
                    setTemplatesPerPage((prevState) => prevState + 4)
                  }
                />
              )}
              <h2>{template.title}</h2>
              {template.sections.map((section: any, index: number) => (
                <SectionContainer key={index}>
                  <TemplateSection
                    section={section}
                    hasTemplateTitle={hasTemplateTitle}
                  />
                </SectionContainer>
              ))}
            </div>
          );
        })}
    </ArticleSectionContainer>
  );
};

const mapStateToProps = (state: { tabs: TabsState }) => ({
  tabs: state.tabs,
});

export const ArticleSection = connect(mapStateToProps)(_ArticleSection);
