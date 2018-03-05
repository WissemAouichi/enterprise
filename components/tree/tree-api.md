<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [TREE_DEFAULTS][1]
-   [Datagrid][2]
-   [initTree][3]
-   [initSelected][4]
-   [focusFirst][5]
-   [expandAll][6]
-   [collapseAll][7]
-   [selectNodeById][8]
-   [loadData][9]
-   [getSelectedNodes][10]
-   [addNode][11]
-   [updateNode][12]
-   [removeNode][13]
-   [updated][14]
-   [destroy][15]
-   [unselected][16]
-   [selected][17]
-   [menuselect][18]
-   [menuopen][19]

## TREE_DEFAULTS

**Properties**

-   `selectable` **[string][20]** 'single' or 'multiple'.
-   `hideCheckboxes` **[boolean][21]** Only applies when `selectable` is set to 'multiple'.
-   `menuId` **(null | [string][20])** if defined, will be used to identify a Context Menu by ID
    attribute in which to add nodes.
-   `useStepUI` **[boolean][21]** if `true`, turns this tree instance into a "Stepped" tree.
-   `folderIconOpen` **[string][20]** the icon used when a tree folder node is open.
-   `folderIconClosed` **[string][20]** the icon used when a tree folder node is closed.
-   `sortable` **[boolean][21]** if `true`, allows nodes to become sortable.
-   `onBeforeSelect` **(null | [function][22])** if defined as a function, fires that function as a
    callback before the selection on a node occurs.

## Datagrid

Thetree Component displays a hierarchical list.

**Parameters**

-   `element` **[string][20]** The component element.
-   `settings` **[string][20]** The component settings.

## initTree

Init Tree from ul, li, a markup structure in DOM

## initSelected

Init selected notes

## focusFirst

Focus the first tree node

## expandAll

Expands a collection of tree nodes.

**Parameters**

-   `nodes` **[Object][23]** a jQuery-wrapped collection of tree node elements.
    If left undefined, this will automatically use all `ul[role=group]` elements.

Returns **void** 

## collapseAll

Collapses a collection of tree nodes.

**Parameters**

-   `nodes` **[Object][23]** a jQuery-wrapped collection of tree node elements.
    If left undefined, this will automatically use all `ul[role=group]` elements.

Returns **void** 

## selectNodeById

Selects a tree node specifically using it's ID attribute.

**Parameters**

-   `id` **[String][20]** the ID string to use.

Returns **void** 

## loadData

Handle Loading JSON.

**Parameters**

-   `dataset` **[Object][23]** to load.

Returns **void** 

## getSelectedNodes

Get selected nodes.

Returns **[Object][23]** selected nodes

## addNode

Add a node and all its related markup.

**Parameters**

-   `nodeData` **[Object][23]** to add.
-   `location` **[Object][23]** in tree.

Returns **[Object][23]** li added

## updateNode

Update fx rename a node.

**Parameters**

-   `nodeData` **[Object][23]** to update.

Returns **void** 

## removeNode

Delete a node from the dataset or tree.

**Parameters**

-   `nodeData` **[Object][23]** to delete.

Returns **void** 

## updated

Resync the UI and Settings.

**Parameters**

-   `settings` **[Object][23]** The settings to apply.

Returns **[Object][23]** The api

## destroy

Destroy this component instance and remove the link from its base element.

Returns **void** 

## unselected

Fires on un select node.

**Properties**

-   `event` **[Object][23]** The jquery event object
-   `data` **[Object][23]** and node element

## selected

Fires on select node.

**Properties**

-   `event` **[Object][23]** The jquery event object
-   `data` **[Object][23]** and node element

## menuselect

Fires when the menu item select.

**Properties**

-   `event` **[Object][23]** The jquery event object
-   `data` **[Object][23]** for node element, item

## menuopen

Fires when the menu open.
menu options - use it to update the menu as needed

**Properties**

-   `event` **[Object][23]** The jquery event object
-   `data` **[Object][23]** for node element, menu

[1]: #tree_defaults

[2]: #datagrid

[3]: #inittree

[4]: #initselected

[5]: #focusfirst

[6]: #expandall

[7]: #collapseall

[8]: #selectnodebyid

[9]: #loaddata

[10]: #getselectednodes

[11]: #addnode

[12]: #updatenode

[13]: #removenode

[14]: #updated

[15]: #destroy

[16]: #unselected

[17]: #selected

[18]: #menuselect

[19]: #menuopen

[20]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[21]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[22]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[23]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object