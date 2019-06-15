import { File, Folder } from '@chester/chester';
import React from 'react';
import '../assets/css';
import { SuiteRow } from '../suites';
import { TestRow } from '../tests';
import styles from './browser.module.scss';
import { ToolBar } from './tool-bar';
import { TopBar } from './top-bar';

interface BrowserProps {
  folder: Folder;
  onRunFile?: (file: File) => void;
  onRunFolder?: (folder: Folder) => void;
}
export function Browser({ folder, onRunFolder }: BrowserProps) {
  return (
    <>
      <TopBar projectName={folder.name} />
      <ToolBar
        onRunAll={() => {
          onRunFolder && onRunFolder(folder);
        }}
      />
      <div className={styles.wrapper}>
        <div className={styles.list}>
          {folder.folders.map((folder, i) => {
            return <FolderRow key={i} folder={folder} depth={1} />;
          })}
        </div>
      </div>
    </>
  );
}

type TestFile = File & {
  status?: 'passed' | 'failed';
};

type TestFolder = Folder & {
  folders: TestFolder[];
  files: TestFile[];
};

interface FolderRowProps {
  depth: number;
  folder: TestFolder;
}
function FolderRow(props: FolderRowProps) {
  return (
    <div>
      <SuiteRow
        status={getSuiteState(props.folder)}
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
  spec: TestFile;
  depth: number;
}
function SpecRow(props: SpecRowProps) {
  return (
    <TestRow
      name={props.spec.name}
      depth={props.depth}
      duration={{ interval: 8, unit: 'ms' }}
      status={props.spec.status || 'pending'}
    />
  );
}

function getSuiteState(folder: TestFolder): 'pending' | 'passed' | 'failed' {
  let state: 'pending' | 'passed' | 'failed' = 'pending';
  if (folder.folders.length) {
    if (folder.folders.every(s => getSuiteState(s) === 'passed')) {
      state = 'passed';
    } else if (folder.folders.some(s => getSuiteState(s) === 'failed')) {
      state = 'failed';
    } else {
      state = 'pending';
    }
  }
  if (state !== 'passed') return state;
  if (folder.files.every((t: TestFile) => t.status === 'passed'))
    return 'passed';
  else if (folder.files.some((t: TestFile) => t.status === 'failed'))
    return 'failed';
  return 'pending';
}
