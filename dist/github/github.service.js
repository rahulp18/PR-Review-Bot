"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubService = void 0;
const common_1 = require("@nestjs/common");
const rest_1 = require("@octokit/rest");
let GithubService = class GithubService {
    constructor() {
        this.octokit = new rest_1.Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });
    }
    async getPRFiles(owner, repo, prNumber) {
        const { data } = await this.octokit.pulls.listFiles({
            owner,
            repo,
            pull_number: prNumber,
        });
        return data?.map((file) => ({ filename: file.filename, path: file.patch }));
    }
    async commentOnPR(owner, repo, prNumber, comment) {
        await this.octokit.issues.createComment({
            owner,
            repo,
            issue_number: prNumber,
            body: comment,
        });
    }
};
exports.GithubService = GithubService;
exports.GithubService = GithubService = __decorate([
    (0, common_1.Injectable)()
], GithubService);
//# sourceMappingURL=github.service.js.map