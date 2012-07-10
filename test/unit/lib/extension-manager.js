var srcPath = __dirname + "/../../../lib/",
    extManager = require(srcPath + "extension-manager"),
    packagerUtils = require(srcPath + "packager-utils"),
    fs = require("fs"),
    path = require("path"),
    testData = require("./test-data"),
    session = testData.session,
    result;

function loadModule(path) {
    var isGlobal = false,
        namespace,
        dependencies = [];

    if (path.indexOf("app") >= 0) {
        namespace = "blackberry.app";
    } else if (path.indexOf("event") >= 0) {
        namespace = "blackberry.event";
        isGlobal = true;
    } else if (path.indexOf("identity") >= 0) {
        namespace = "blackberry.identity";
    } else if (path.indexOf("system") >= 0) {
        namespace = "blackberry.system";
    } else {
        namespace = "abc.xyz";
    }

    return {
        "global": isGlobal,
        "namespace": namespace,
        "dependencies": dependencies
    };
}

describe("Extension manager", function () {
    it("initialize returns the actual extension manager object", function () {
        spyOn(path, "existsSync").andReturn(true);
        spyOn(fs, "readdirSync").andReturn(["app", "event", "system", "identity"]);
        spyOn(packagerUtils, "loadModule").andCallFake(loadModule);

        result = extManager.initialize(session);

        expect(result.getGlobalFeatures).toBeDefined();
        expect(result.getAllExtensionsToCopy).toBeDefined();
        expect(result.getExtensionBasenameByFeatureId).toBeDefined();
        expect(result.getFeatureIdByExtensionBasename).toBeDefined();
        expect(result.getGlobalFeatures()).toContain({
            id: "blackberry.event",
            version: "1.0.0.0",
            required: true
        });
    });
});