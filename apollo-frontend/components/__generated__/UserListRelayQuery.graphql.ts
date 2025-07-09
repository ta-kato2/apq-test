/**
 * @generated SignedSource<<41375dc1c5d38bfc26a90da212221505>>
 * @relayHash 93db6a058f7b6b3c90b2a6345f21e215
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 93db6a058f7b6b3c90b2a6345f21e215

import { ConcreteRequest } from 'relay-runtime';
export type UserListRelayQuery$variables = {
  name?: string | null | undefined;
};
export type UserListRelayQuery$data = {
  readonly users: ReadonlyArray<{
    readonly age: number | null | undefined;
    readonly email: string;
    readonly id: string;
    readonly name: string;
  } | null | undefined> | null | undefined;
};
export type UserListRelayQuery = {
  response: UserListRelayQuery$data;
  variables: UserListRelayQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "name"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "name",
        "variableName": "name"
      }
    ],
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "users",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "email",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "age",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UserListRelayQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserListRelayQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "93db6a058f7b6b3c90b2a6345f21e215",
    "metadata": {},
    "name": "UserListRelayQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "47742192b76fcd7e7c91ef2b45f14ffa";

export default node;
