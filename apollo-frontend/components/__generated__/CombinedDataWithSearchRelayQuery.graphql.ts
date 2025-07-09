/**
 * @generated SignedSource<<889d4dad4d3192ce2b9a803c7b5215f2>>
 * @relayHash e56c68fe96cc581da50cae8f67bb1fcb
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID e56c68fe96cc581da50cae8f67bb1fcb

import { ConcreteRequest } from 'relay-runtime';
export type CombinedDataWithSearchRelayQuery$variables = {
  productName?: string | null | undefined;
  userName?: string | null | undefined;
};
export type CombinedDataWithSearchRelayQuery$data = {
  readonly products: ReadonlyArray<{
    readonly id: string;
    readonly inStock: boolean;
    readonly name: string;
    readonly price: number;
  } | null | undefined> | null | undefined;
  readonly users: ReadonlyArray<{
    readonly email: string;
    readonly id: string;
    readonly name: string;
  } | null | undefined> | null | undefined;
};
export type CombinedDataWithSearchRelayQuery = {
  response: CombinedDataWithSearchRelayQuery$data;
  variables: CombinedDataWithSearchRelayQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "productName"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "userName"
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "name",
        "variableName": "userName"
      }
    ],
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "users",
    "plural": true,
    "selections": [
      (v2/*: any*/),
      (v3/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "email",
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "name",
        "variableName": "productName"
      }
    ],
    "concreteType": "Product",
    "kind": "LinkedField",
    "name": "products",
    "plural": true,
    "selections": [
      (v2/*: any*/),
      (v3/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "price",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "inStock",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CombinedDataWithSearchRelayQuery",
    "selections": (v4/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "CombinedDataWithSearchRelayQuery",
    "selections": (v4/*: any*/)
  },
  "params": {
    "id": "e56c68fe96cc581da50cae8f67bb1fcb",
    "metadata": {},
    "name": "CombinedDataWithSearchRelayQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "53983fbcaea728633fc2048a8c929998";

export default node;
