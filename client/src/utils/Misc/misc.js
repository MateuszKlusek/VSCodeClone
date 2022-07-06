import _ from "lodash";

export const getNumbersFromString = (txt) => {
    var numb = txt.match(/\d/g);
    if (numb === null) {
        return 1
    } else {
        numb = numb.join("");
        return Number(numb)
    }
}

export const insertAt = (str, sub, pos) => `${str.slice(0, pos)}${sub}${str.slice(pos)}`;

export const insert = function (arr, index, item) {
    return [
        ...arr.slice(0, index),     // first half
        item,                       // items to be inserted
        ...arr.slice(index)         // second half
    ];
};

export const sortFolderStructure = (folderStructure) => {
    try {

        var _folderStructure = _.cloneDeep(folderStructure)

        // getting the max depth
        const maxDepth = _folderStructure.sort((a, b) => a.depth - b.depth)[_folderStructure.length - 1].depth

        var result = []

        var currentDepth = 0
        while (currentDepth <= maxDepth) {
            var thisDepthFiles = _folderStructure.filter((el) => el.depth === currentDepth)

            // first folders and sort them, then files and sort them
            var tempFolders = thisDepthFiles.filter((el) => el.fileType === "folder").sort((a, b) => a.fileName.localeCompare(b.fileName))
            var tempFiles = thisDepthFiles.filter((el) => el.fileType === "file").sort((a, b) => a.fileName.localeCompare(b.fileName))
            var thisDepthFiles = [...tempFolders, ...tempFiles]

            if (currentDepth === 0) {
                result = [...result, ...thisDepthFiles]
            } else {
                var tempResult = [...result]

                for (var parentFileIdx in result) {
                    for (var childrenFileIdx in thisDepthFiles) {
                        // get children path
                        var childrenPath = thisDepthFiles[childrenFileIdx].filePath.split("/")
                        childrenPath.pop()
                        childrenPath = childrenPath.join("/")
                        if (childrenPath === result[parentFileIdx].filePath) {
                            tempResult = insert(tempResult, parentFileIdx, thisDepthFiles[childrenFileIdx])
                        }
                    }
                }

                result = [...tempResult]
            }
            currentDepth++
        }

        result = result.reverse()

        return { sortedFolderStructure: result }
    } catch (err) {
        return { sortedFolderStructure: [] }
    }
}