/**
 * @generated SignedSource<<ec5b1dc4a49f13f0dc0ecdc4f714416f>>
 * @relayHash b2f77651f7bbbc214b179794f8d8c71f
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID b2f77651f7bbbc214b179794f8d8c71f

import { ConcreteRequest } from 'relay-runtime';
export type PersistedQueryDemoRelayQuery$variables = Record<PropertyKey, never>;
export type PersistedQueryDemoRelayQuery$data = {
  readonly users: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
  } | null | undefined> | null | undefined;
};
export type PersistedQueryDemoRelayQuery = {
  response: PersistedQueryDemoRelayQuery$data;
  variables: PersistedQueryDemoRelayQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
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
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PersistedQueryDemoRelayQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PersistedQueryDemoRelayQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": "b2f77651f7bbbc214b179794f8d8c71f",
    "metadata": {},
    "name": "PersistedQueryDemoRelayQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "451dd47c302eb3608ad8904d20170251";

export default node;
