import React from 'react';
import {MainRPC, ProjectRPC, OperationRPC, UserRPC} from 'rpc';

it('get initial project list', async () => {
    return expect(await MainRPC.getProjectList()).toStrictEqual([]);
});

it('add project and get project list', async () => {
    const projectData = {
        key: 0,
        name: 'project',
        description: 'description'
    };

    await MainRPC.addProject(projectData);
    expect(await MainRPC.getProjectList()).toStrictEqual([projectData]);
});

it('add project and get id', async () => {
  const projectKey =  'non number';
  const projectData = {
    key: projectKey,
    name: 'project',
    description: 'description'
  };

  expect(await MainRPC.addProject(projectData)).toStrictEqual('non number');
});

it('add stage and get project data', async () => {
    const projectKey = 0;
    const projectData = {
        key: projectKey,
        name: 'project',
        description: 'description'
    };
    const stageData = {
        key: projectKey,
        stages: [{
            key: 0,
            title: 'stage'
        }]
    };

    await MainRPC.addProject(projectData);
    await ProjectRPC.updateStagesList(projectKey, stageData);
    expect(await ProjectRPC.getStagesList(projectKey)).toStrictEqual(stageData);
});

it('add actor and get actors list', async () => {
    const actorKey = 7;
    const actorData = {
        key: actorKey,
        name: 'actor'
    };

    await OperationRPC.addActor(actorData);
    expect(await OperationRPC.getActorsList(actorKey)).toStrictEqual([actorData]);
});


it('add actor and get key', async () => {
  const actorKey = {
    name: 'ashwga'
  };
  const actorData = {
    key: actorKey,
    name: 'actor'
  };

  expect(await OperationRPC.addActor(actorData)).toStrictEqual(actorKey);
});

it('register new user', async () => {
  const userData = {
    email: 'nefritor@gmail.com',
    password: 1234567890
  };

  expect(await UserRPC.register(userData)).toStrictEqual(true);
});

it('deleting project', async () => {
  const projectKey = 3;

  expect(await MainRPC.deleteProject(projectKey)).toStrictEqual(true);
});

it('deleting stage', async () => {
  const projectKey = 0;
  const stageKey = 1;

  const projectData = {
    key: projectKey,
    name: 'project',
    description: 'description'
  };

  await MainRPC.addProject(projectData);
  expect(await ProjectRPC.deleteStage(projectKey, stageKey)).toStrictEqual(true);
});

it('removing actor', async () => {
  const actorKey = 0;
  const actorData = {
    key: actorKey,
    title: 'actor'
  };

  // await OperationRPC.addActor(actorData);

  expect(await OperationRPC.removeActor(actorKey)).toStrictEqual([]);
});