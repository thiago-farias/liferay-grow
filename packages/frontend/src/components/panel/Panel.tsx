import ClayCard from '@clayui/card';
import ClayLayout from '@clayui/layout';
import ClayPanel from '@clayui/panel';
import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';

import ProgressBar from './ProgressBar';

type IPanelItem = {
  href?: string;
};

const PanelItem: React.FC<IPanelItem> = ({ children, href }) => {
  const PanelItem = (
    <ClayLayout.Col size={4} className="d-flex">
      <ClayCard
        className={classNames('p-2 flex-grow-1', {
          'profile__panel--link': href,
        })}
      >
        {children}
      </ClayCard>
    </ClayLayout.Col>
  );

  if (href) {
    return <Link href={href}>{PanelItem}</Link>;
  }

  return PanelItem;
};

const PanelTitle: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
  className,
  ...otherProps
}) => {
  return (
    <p {...otherProps} className={classNames('panel--title', className)}>
      {children}
    </p>
  );
};

const PanelBody: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
}) => {
  return <div className="panel--body">{children}</div>;
};

interface IPanelProps {
  title: string;
  defaultExpanded?: boolean;
  displayType?: 'secondary' | 'unstyled';
}

const Panel: React.FC<IPanelProps> & {
  Body: React.ElementType;
  Item: React.ElementType;
  Title: React.ElementType;
  ProgressBar: React.ElementType;
} = ({
  children,
  defaultExpanded = true,
  displayType = 'secondary',
  title,
}) => {
  return (
    <ClayPanel
      collapsable
      defaultExpanded={defaultExpanded}
      displayTitle={title}
      displayType={displayType}
      className="panel"
      showCollapseIcon
    >
      <ClayPanel.Body>
        <ClayLayout.Row>{children}</ClayLayout.Row>
      </ClayPanel.Body>
    </ClayPanel>
  );
};

Panel.Body = PanelBody;
Panel.Item = PanelItem;
Panel.Title = PanelTitle;
Panel.ProgressBar = ProgressBar;

export default Panel;
