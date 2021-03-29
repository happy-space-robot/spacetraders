import React from 'react';

type StatusViewProps = {
  serverStatus: string
}

export const StatusViewComponent = ({ serverStatus }: StatusViewProps) =>
  <div className="status-view">
    <p>{ serverStatus }</p>
  </div>