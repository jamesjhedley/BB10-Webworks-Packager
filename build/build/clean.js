/*
* Copyright 2011 Research In Motion Limited.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var wrench = require("../../node_modules/wrench"),
    path = require("path"),
    _c = require("./conf");

module.exports = function (prev, baton) {
    //Remove existing target directory
    wrench.rmdirSyncRecursive(_c.TARGET, true);
    wrench.rmdirSyncRecursive(path.join(_c.NODE_MOD, '/fs-tools/support'), true);
};
