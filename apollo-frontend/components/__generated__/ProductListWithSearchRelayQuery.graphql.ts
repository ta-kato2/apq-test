/**
 * @generated SignedSource<<4a6f1a3299175433c077adae0046f812>>
 * @relayHash 9bcfc5b834d817364fae6cddcfdf8cae
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 9bcfc5b834d817364fae6cddcfdf8cae

import { ConcreteRequest } from 'relay-runtime';
export type ProductListWithSearchRelayQuery$variables = {
  name?: string | null | undefined;
};
export type ProductListWithSearchRelayQuery$data = {
  readonly products: ReadonlyArray<{
    readonly description: string | null | undefined;
    readonly id: string;
    readonly inStock: boolean;
    readonly name: string;
    readonly price: number;
  } | null | undefined> | null | undefined;
};
export type ProductListWithSearchRelayQuery = {
  response: ProductListWithSearchRelayQuery$data;
  variables: ProductListWithSearchRelayQuery$variables;
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
    "concreteType": "Product",
    "kind": "LinkedField",
    "name": "products",
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
        "name": "price",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "description",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ProductListWithSearchRelayQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ProductListWithSearchRelayQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "9bcfc5b834d817364fae6cddcfdf8cae",
    "metadata": {},
    "name": "ProductListWithSearchRelayQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "ce6caf071f066db0de3dd05ca8790749";

export default node;
