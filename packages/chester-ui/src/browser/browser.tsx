import React from 'react';
import '../assets/css';
import styles from './browser.module.scss';
import { TopBar } from './top-bar';
import { ToolBar } from './tool-bar';
import { Folder, File } from '@chester/chester';
import { SuiteRow } from '../suites';
import { TestRow } from '../tests';

interface BrowserProps {
  folders: Folder[];
}
export function Browser(props: BrowserProps) {
  return (
    <div className={styles.container}>
      <TopBar />
      <ToolBar />
      <div className={styles.list}>
        {props.folders.map((folder, i) => {
          return <FolderRow key={i} folder={folder} depth={1} />;
        })}
      </div>
    </div>
  );
}

interface FolderRowProps {
  depth: number;
  folder: Folder;
}
function FolderRow(props: FolderRowProps) {
  return (
    <div>
      <SuiteRow
        status="failed"
        depth={props.depth}
        name={props.folder.name}
        duration={{ interval: 8, unit: 'ms' }}
      />
      {props.folder.files.map((file, i) => {
        return <SpecRow key={i} spec={file} depth={props.depth} />;
      })}
      {props.folder.folders.map((folder, i) => {
        return <FolderRow key={i} folder={folder} depth={props.depth + 1} />;
      })}
    </div>
  );
}

interface SpecRowProps {
  spec: File;
  depth: number;
}
function SpecRow(props: SpecRowProps) {
  return (
    <TestRow
      name={props.spec.name}
      status="failed"
      depth={props.depth}
      duration={{ interval: 8, unit: 'ms' }}
    />
  );
}
