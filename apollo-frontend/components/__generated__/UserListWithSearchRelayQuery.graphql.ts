/**
 * @generated SignedSource<<9419e814a9d64bbad1d1875fa507804a>>
 * @relayHash 110132e3df1cd05f2f54e2504803bb59
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 110132e3df1cd05f2f54e2504803bb59

import { ConcreteRequest } from 'relay-runtime';
export type UserListWithSearchRelayQuery$variables = {
  name?: string | null | undefined;
};
export type UserListWithSearchRelayQuery$data = {
  readonly users: ReadonlyArray<{
    readonly age: number | null | undefined;
    readonly email: string;
    readonly id: string;
    readonly name: string;
  } | null | undefined> | null | undefined;
};
export type UserListWithSearchRelayQuery = {
  response: UserListWithSearchRelayQuery$data;
  variables: UserListWithSearchRelayQuery$variables;
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
    "name": "UserListWithSearchRelayQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserListWithSearchRelayQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "110132e3df1cd05f2f54e2504803bb59",
    "metadata": {},
    "name": "UserListWithSearchRelayQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "317cd6be2dc745c54ed92886c048ea62";

export default node;
