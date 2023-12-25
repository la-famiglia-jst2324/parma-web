"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, tries: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.tries.pop(); continue;
                default:
                    if (!(t = _.tries, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.tries.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prismaClient_1 = require("./prisma/prismaClient");
function generateRandomAuthId(length) {
    if (length === void 0) { length = 32; }
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
function generateRandomPdfUrl() {
    var randomChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var result = 'http://example.com/';
    for (var i = 0; i < 15; i++) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result + '.pdf';
}
function getRandomEnumValue(enumArray) {
    var randomIndex = Math.floor(Math.random() * enumArray.length);
    return enumArray[randomIndex];
}
// Function to generate a random date between two dates
function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
// Function to generate a random integer within a range
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var startDate, endDate, minValue, maxValue, users, i, _a, _b, companies, i, _c, _d, buckets, i, _e, _f, _i, companies_1, company, _g, buckets_1, bucket, channels, i, channel, i, channel, _h, users_1, user, i, _j, channels_1, channel, _k, companies_2, company, _l, users_2, user, allFrequencies, allHealthStatuses, sourceNames, invocationEndpoints, dataSources, i, _m, _o, allScheduleTypes, allTaskStatuses, _p, dataSources_1, dataSource, _q, companies_3, company, _r, dataSources_2, dataSource, allBucketPermissions, _s, buckets_2, bucket, _t, users_3, user, _u, companies_4, company, _v, dataSources_3, dataSource, possibleTypes, possibleMeasurementNames, sourceMeasurements, _w, dataSources_4, dataSource, i, random, _x, _y, companySourceMeasurements, _z, companies_5, company, _0, sourceMeasurements_1, sourceMeasurement, _1, _2, _3, companySourceMeasurements_1, csm, i, _4, companies_6, company, i, _5, users_4, user, _6, dataSources_5, dataSource, _7, possibleMeasurementNames_1, fieldName, existingPreference, _8, users_5, user, _9, companies_7, company, customizations, userCustomizations, _10, users_6, user, _11, customizations_1, customization, _12, _13, _14, companies_8, company, _15, userCustomizations_1, customization, i, _16, companies_9, company;
        return __generator(this, function (_17) {
            switch (_17.label) {
                case 0:
                    startDate = new Date(2020, 0, 1) // Adjust as needed
                    ;
                    endDate = new Date() // Today's date
                    ;
                    minValue = 0 // Adjust as needed
                    ;
                    maxValue = 10000 // Adjust as needed
                    ;
                    users = [];
                    i = 0;
                    _17.label = 1;
                case 1:
                    if (!(i < 10)) return [3 /*break*/, 4];
                    _b = (_a = users).push;
                    return [4 /*yield*/, prismaClient_1.prisma.user.create({
                            data: {
                                authId: generateRandomAuthId(),
                                name: "User ".concat(i),
                                role: i % 5 === 0 ? client_1.Role.ADMIN : client_1.Role.USER
                                // Add other fields as necessary
                            }
                        })];
                case 2:
                    _b.apply(_a, [_17.sent()]);
                    _17.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    companies = [];
                    i = 0;
                    _17.label = 5;
                case 5:
                    if (!(i < 20)) return [3 /*break*/, 8];
                    _d = (_c = companies).push;
                    return [4 /*yield*/, prismaClient_1.prisma.company.create({
                            data: {
                                name: "Company ".concat(i),
                                addedBy: users[Math.floor(i / 2)].id
                                // Add other fields as necessary
                            }
                        })];
                case 6:
                    _d.apply(_c, [_17.sent()]);
                    _17.label = 7;
                case 7:
                    i++;
                    return [3 /*break*/, 5];
                case 8:
                    buckets = [];
                    i = 0;
                    _17.label = 9;
                case 9:
                    if (!(i < 3)) return [3 /*break*/, 12];
                    _f = (_e = buckets).push;
                    return [4 /*yield*/, prismaClient_1.prisma.bucket.create({
                            data: {
                                ownerId: users[Math.floor(i * 3)].id,
                                title: "Bucket ".concat(i)
                            }
                        })];
                case 10:
                    _f.apply(_e, [_17.sent()]);
                    _17.label = 11;
                case 11:
                    i++;
                    return [3 /*break*/, 9];
                case 12:
                    _i = 0, companies_1 = companies;
                    _17.label = 13;
                case 13:
                    if (!(_i < companies_1.length)) return [3 /*break*/, 18];
                    company = companies_1[_i];
                    _g = 0, buckets_1 = buckets;
                    _17.label = 14;
                case 14:
                    if (!(_g < buckets_1.length)) return [3 /*break*/, 17];
                    bucket = buckets_1[_g];
                    return [4 /*yield*/, prismaClient_1.prisma.companyBucketMembership.create({
                            data: {
                                companyId: company.id,
                                bucketId: bucket.id
                                // created and modified dates will be set automatically
                            }
                        })];
                case 15:
                    _17.sent();
                    _17.label = 16;
                case 16:
                    _g++;
                    return [3 /*break*/, 14];
                case 17:
                    _i++;
                    return [3 /*break*/, 13];
                case 18:
                    channels = [];
                    i = 0;
                    _17.label = 19;
                case 19:
                    if (!(i < 5)) return [3 /*break*/, 22];
                    return [4 /*yield*/, prismaClient_1.prisma.notificationChannel.create({
                            data: {
                                channelType: client_1.ChannelType.EMAIL,
                                destination: "destination".concat(i, "@example.com")
                            }
                        })];
                case 20:
                    channel = _17.sent();
                    channels.push(channel);
                    _17.label = 21;
                case 21:
                    i++;
                    return [3 /*break*/, 19];
                case 22:
                    i = 0;
                    _17.label = 23;
                case 23:
                    if (!(i < 5)) return [3 /*break*/, 26];
                    return [4 /*yield*/, prismaClient_1.prisma.notificationChannel.create({
                            data: {
                                channelType: client_1.ChannelType.SLACK,
                                destination: "slack_destination_".concat(i),
                                apiKey: "api_key_".concat(i)
                                // created and modified dates will be set automatically
                            }
                        })];
                case 24:
                    channel = _17.sent();
                    channels.push(channel);
                    _17.label = 25;
                case 25:
                    i++;
                    return [3 /*break*/, 23];
                case 26:
                    _h = 0, users_1 = users;
                    _17.label = 27;
                case 27:
                    if (!(_h < users_1.length)) return [3 /*break*/, 35];
                    user = users_1[_h];
                    i = 0;
                    _j = 0, channels_1 = channels;
                    _17.label = 28;
                case 28:
                    if (!(_j < channels_1.length)) return [3 /*break*/, 34];
                    channel = channels_1[_j];
                    if (!(i % 2 == 0)) return [3 /*break*/, 30];
                    return [4 /*yield*/, prismaClient_1.prisma.notificationSubscription.create({
                            data: {
                                userId: user.id,
                                channelId: channel.id,
                                channelPurpose: client_1.ChannelPurpose.NOTIFICATION // Adjust as per your ChannelPurpose enum
                                // createdAt and modifiedAt will be set automatically to the current time
                            }
                        })];
                case 29:
                    _17.sent();
                    return [3 /*break*/, 32];
                case 30: return [4 /*yield*/, prismaClient_1.prisma.notificationSubscription.create({
                        data: {
                            userId: user.id,
                            channelId: channel.id,
                            channelPurpose: client_1.ChannelPurpose.REPORT // Adjust as per your ChannelPurpose enum
                            // createdAt and modifiedAt will be set automatically to the current time
                        }
                    })];
                case 31:
                    _17.sent();
                    _17.label = 32;
                case 32:
                    i++;
                    _17.label = 33;
                case 33:
                    _j++;
                    return [3 /*break*/, 28];
                case 34:
                    _h++;
                    return [3 /*break*/, 27];
                case 35:
                    _k = 0, companies_2 = companies;
                    _17.label = 36;
                case 36:
                    if (!(_k < companies_2.length)) return [3 /*break*/, 41];
                    company = companies_2[_k];
                    _l = 0, users_2 = users;
                    _17.label = 37;
                case 37:
                    if (!(_l < users_2.length)) return [3 /*break*/, 40];
                    user = users_2[_l];
                    // Limit the number of attachments per user per company if desired
                    return [4 /*yield*/, prismaClient_1.prisma.companyAttachment.create({
                            data: {
                                companyId: company.id,
                                fileType: client_1.FileType.PDF,
                                fileUrl: generateRandomPdfUrl(),
                                userId: user.id,
                                title: "Company ".concat(company.id, " Attachment for User ").concat(user.id)
                                // createdAt and modifiedAt will be set automatically to the current time
                            }
                        })];
                case 38:
                    // Limit the number of attachments per user per company if desired
                    _17.sent();
                    _17.label = 39;
                case 39:
                    _l++;
                    return [3 /*break*/, 37];
                case 40:
                    _k++;
                    return [3 /*break*/, 36];
                case 41:
                    allFrequencies = Object.values(client_1.Frequency) // e.g., [Frequency.HOURLY, Frequency.DAILY, ...]
                    ;
                    allHealthStatuses = Object.values(client_1.HealthStatus) // e.g., [HealthStatus.UP, HealthStatus.DOWN, ...]
                    ;
                    sourceNames = ['Reddit Staging', 'Github Staging', 'Affinity Staging'] // Add more as needed
                    ;
                    invocationEndpoints = [
                        'https://reddit.sourcing.staging.parma.software/',
                        'https://github.sourcing.staging.parma.software/',
                        'https://affinity.sourcing.staging.parma.software/'
                    ] // Add more as needed
                    ;
                    dataSources = [];
                    i = 0;
                    _17.label = 42;
                case 42:
                    if (!(i < sourceNames.length)) return [3 /*break*/, 45];
                    _o = (_m = dataSources).push;
                    return [4 /*yield*/, prismaClient_1.prisma.dataSource.create({
                            data: {
                                sourceName: sourceNames[i],
                                isActive: Math.random() < 0.5,
                                frequency: getRandomEnumValue(allFrequencies),
                                healthStatus: getRandomEnumValue(allHealthStatuses),
                                description: "Description for ".concat(sourceNames[i]),
                                maxRunSeconds: Math.floor(Math.random() * 600),
                                version: '1.0',
                                invocationEndpoint: invocationEndpoints[i]
                                // createdAt and modifiedAt will be set automatically
                            }
                        })];
                case 43:
                    _o.apply(_m, [_17.sent()]);
                    _17.label = 44;
                case 44:
                    i++;
                    return [3 /*break*/, 42];
                case 45:
                    allScheduleTypes = Object.values(client_1.ScheduleType);
                    allTaskStatuses = Object.values(client_1.TaskStatus);
                    _p = 0, dataSources_1 = dataSources;
                    _17.label = 46;
                case 46:
                    if (!(_p < dataSources_1.length)) return [3 /*break*/, 49];
                    dataSource = dataSources_1[_p];
                    return [4 /*yield*/, prismaClient_1.prisma.scheduledTask.create({
                            data: {
                                dataSourceId: dataSource.id,
                                scheduleType: getRandomEnumValue(allScheduleTypes),
                                scheduledAt: new Date(),
                                // ... other fields
                                status: getRandomEnumValue(allTaskStatuses) // Random task status
                                // createdAt and modifiedAt will be set automatically
                            }
                        })];
                case 47:
                    _17.sent();
                    _17.label = 48;
                case 48:
                    _p++;
                    return [3 /*break*/, 46];
                case 49:
                    _q = 0, companies_3 = companies;
                    _17.label = 50;
                case 50:
                    if (!(_q < companies_3.length)) return [3 /*break*/, 55];
                    company = companies_3[_q];
                    _r = 0, dataSources_2 = dataSources;
                    _17.label = 51;
                case 51:
                    if (!(_r < dataSources_2.length)) return [3 /*break*/, 54];
                    dataSource = dataSources_2[_r];
                    return [4 /*yield*/, prismaClient_1.prisma.companyDataSource.create({
                            data: {
                                companyId: company.id,
                                dataSourceId: dataSource.id,
                                isDataSourceActive: Math.random() < 0.5,
                                healthStatus: getRandomEnumValue(allHealthStatuses) // Random health status
                                // createdAt and modifiedAt will be set automatically
                            }
                        })];
                case 52:
                    _17.sent();
                    _17.label = 53;
                case 53:
                    _r++;
                    return [3 /*break*/, 51];
                case 54:
                    _q++;
                    return [3 /*break*/, 50];
                case 55:
                    allBucketPermissions = Object.values(client_1.BucketPermission);
                    _s = 0, buckets_2 = buckets;
                    _17.label = 56;
                case 56:
                    if (!(_s < buckets_2.length)) return [3 /*break*/, 61];
                    bucket = buckets_2[_s];
                    _t = 0, users_3 = users;
                    _17.label = 57;
                case 57:
                    if (!(_t < users_3.length)) return [3 /*break*/, 60];
                    user = users_3[_t];
                    return [4 /*yield*/, prismaClient_1.prisma.bucketAccess.create({
                            data: {
                                bucketId: bucket.id,
                                inviteeId: user.id,
                                permission: getRandomEnumValue(allBucketPermissions) // Random bucket permission
                                // createdAt and modifiedAt will be set automatically
                            }
                        })];
                case 58:
                    _17.sent();
                    _17.label = 59;
                case 59:
                    _t++;
                    return [3 /*break*/, 57];
                case 60:
                    _s++;
                    return [3 /*break*/, 56];
                case 61:
                    _u = 0, companies_4 = companies;
                    _17.label = 62;
                case 62:
                    if (!(_u < companies_4.length)) return [3 /*break*/, 67];
                    company = companies_4[_u];
                    _v = 0, dataSources_3 = dataSources;
                    _17.label = 63;
                case 63:
                    if (!(_v < dataSources_3.length)) return [3 /*break*/, 66];
                    dataSource = dataSources_3[_v];
                    return [4 /*yield*/, prismaClient_1.prisma.notification.create({
                            data: {
                                message: "Notification for Company: ".concat(company.name, " and DataSource: ").concat(dataSource.sourceName),
                                companyId: company.id,
                                dataSourceId: dataSource.id
                                // createdAt and modifiedAt will be set automatically
                            }
                        })];
                case 64:
                    _17.sent();
                    _17.label = 65;
                case 65:
                    _v++;
                    return [3 /*break*/, 63];
                case 66:
                    _u++;
                    return [3 /*break*/, 62];
                case 67:
                    possibleTypes = ['Int', 'Int', 'Int', 'Float', 'Paragraph', 'Text'] // Add more as needed
                    ;
                    possibleMeasurementNames = [
                        '# of Employees',
                        '# of Stars',
                        '# of followers',
                        'Monthly Revenue',
                        'Review',
                        'Event'
                    ] // Add more as needed
                    ;
                    sourceMeasurements = [];
                    _w = 0, dataSources_4 = dataSources;
                    _17.label = 68;
                case 68:
                    if (!(_w < dataSources_4.length)) return [3 /*break*/, 73];
                    dataSource = dataSources_4[_w];
                    i = 0;
                    _17.label = 69;
                case 69:
                    if (!(i < 3)) return [3 /*break*/, 72];
                    random = Math.floor(Math.random() * possibleTypes.length);
                    _y = (_x = sourceMeasurements).push;
                    return [4 /*yield*/, prismaClient_1.prisma.sourceMeasurement.create({
                            data: {
                                sourceModuleId: dataSource.id,
                                type: possibleTypes[random],
                                measurementName: possibleMeasurementNames[random] // Random measurement name
                                // parentMeasurementId: null or some logic if you're handling hierarchy
                                // createdAt and modifiedAt will be set automatically
                            }
                        })];
                case 70:
                    _y.apply(_x, [_17.sent()]);
                    _17.label = 71;
                case 71:
                    i++;
                    return [3 /*break*/, 69];
                case 72:
                    _w++;
                    return [3 /*break*/, 68];
                case 73:
                    companySourceMeasurements = [];
                    _z = 0, companies_5 = companies;
                    _17.label = 74;
                case 74:
                    if (!(_z < companies_5.length)) return [3 /*break*/, 79];
                    company = companies_5[_z];
                    _0 = 0, sourceMeasurements_1 = sourceMeasurements;
                    _17.label = 75;
                case 75:
                    if (!(_0 < sourceMeasurements_1.length)) return [3 /*break*/, 78];
                    sourceMeasurement = sourceMeasurements_1[_0];
                    // You might want to add additional logic to avoid duplicate entries
                    _2 = (_1 = companySourceMeasurements).push;
                    return [4 /*yield*/, prismaClient_1.prisma.companySourceMeasurement.create({
                            data: {
                                companyId: company.id,
                                sourceMeasurementId: sourceMeasurement.id
                                // Other measurement values can be added here as needed
                            }
                        })];
                case 76:
                    // You might want to add additional logic to avoid duplicate entries
                    _2.apply(_1, [_17.sent()]);
                    _17.label = 77;
                case 77:
                    _0++;
                    return [3 /*break*/, 75];
                case 78:
                    _z++;
                    return [3 /*break*/, 74];
                case 79:
                    _3 = 0, companySourceMeasurements_1 = companySourceMeasurements;
                    _17.label = 80;
                case 80:
                    if (!(_3 < companySourceMeasurements_1.length)) return [3 /*break*/, 88];
                    csm = companySourceMeasurements_1[_3];
                    i = 0;
                    _17.label = 81;
                case 81:
                    if (!(i < 3)) return [3 /*break*/, 87];
                    // Adjust the number of text values as needed
                    return [4 /*yield*/, prismaClient_1.prisma.measurementTextValue.create({
                            data: {
                                companyMeasurementId: csm.companyMeasurementId,
                                value: "Sample text value ".concat(i, " for measurement ").concat(csm.companyMeasurementId),
                                timestamp: randomDate(startDate, endDate) // Set to current time or any logic you prefer
                                // createdAt and modifiedAt will be set automatically
                            }
                        })];
                case 82:
                    // Adjust the number of text values as needed
                    _17.sent();
                    return [4 /*yield*/, prismaClient_1.prisma.measurementIntValue.create({
                            data: {
                                companyMeasurementId: csm.companyMeasurementId,
                                value: randomInt(minValue, maxValue),
                                timestamp: randomDate(startDate, endDate) // Random timestamp within the fixed range
                                // createdAt and modifiedAt will be set automatically
                            }
                        })];
                case 83:
                    _17.sent();
                    return [4 /*yield*/, prismaClient_1.prisma.measurementFloatValue.create({
                            data: {
                                companyMeasurementId: csm.companyMeasurementId,
                                value: Math.random() * (maxValue - minValue) + minValue,
                                timestamp: randomDate(startDate, endDate) // Random timestamp within the fixed range
                                // createdAt and modifiedAt will be set automatically
                            }
                        })];
                case 84:
                    _17.sent();
                    return [4 /*yield*/, prismaClient_1.prisma.measurementParagraphValue.create({
                            data: {
                                companyMeasurementId: csm.companyMeasurementId,
                                value: "Sample paragraph value for measurement ".concat(csm.companyMeasurementId),
                                timestamp: randomDate(startDate, endDate) // Random timestamp within the fixed range
                                // createdAt and modifiedAt will be set automatically
                            }
                        })];
                case 85:
                    _17.sent();
                    _17.label = 86;
                case 86:
                    i++;
                    return [3 /*break*/, 81];
                case 87:
                    _3++;
                    return [3 /*break*/, 80];
                case 88:
                    _4 = 0, companies_6 = companies;
                    _17.label = 89;
                case 89:
                    if (!(_4 < companies_6.length)) return [3 /*break*/, 94];
                    company = companies_6[_4];
                    i = 0;
                    _17.label = 90;
                case 90:
                    if (!(i < 3)) return [3 /*break*/, 93];
                    return [4 /*yield*/, prismaClient_1.prisma.report.create({
                            data: {
                                companyId: company.id,
                                name: "Report ".concat(i + 1, " for Company ").concat(company.id),
                                reportFileUrl: generateRandomPdfUrl(),
                                createdAt: randomDate(startDate, endDate), // Random creation date within the fixed range
                                // modifiedAt will be set automatically to the current time
                            },
                        })];
                case 91:
                    _17.sent();
                    _17.label = 92;
                case 92:
                    i++;
                    return [3 /*break*/, 90];
                case 93:
                    _4++;
                    return [3 /*break*/, 89];
                case 94:
                    _5 = 0, users_4 = users;
                    _17.label = 95;
                case 95:
                    if (!(_5 < users_4.length)) return [3 /*break*/, 103];
                    user = users_4[_5];
                    _6 = 0, dataSources_5 = dataSources;
                    _17.label = 96;
                case 96:
                    if (!(_6 < dataSources_5.length)) return [3 /*break*/, 102];
                    dataSource = dataSources_5[_6];
                    _7 = 0, possibleMeasurementNames_1 = possibleMeasurementNames;
                    _17.label = 97;
                case 97:
                    if (!(_7 < possibleMeasurementNames_1.length)) return [3 /*break*/, 101];
                    fieldName = possibleMeasurementNames_1[_7];
                    return [4 /*yield*/, prismaClient_1.prisma.userImportantMeasurementPreference.findUnique({
                            where: {
                                dataSourceId_userId_importantFieldName: {
                                    dataSourceId: dataSource.id,
                                    userId: user.id,
                                    importantFieldName: fieldName,
                                },
                            },
                        })];
                case 98:
                    existingPreference = _17.sent();
                    if (!!existingPreference) return [3 /*break*/, 100];
                    return [4 /*yield*/, prismaClient_1.prisma.userImportantMeasurementPreference.create({
                            data: {
                                dataSourceId: dataSource.id,
                                userId: user.id,
                                importantFieldName: fieldName,
                                // createdAt and modifiedAt will be set automatically
                            },
                        })];
                case 99:
                    _17.sent();
                    _17.label = 100;
                case 100:
                    _7++;
                    return [3 /*break*/, 97];
                case 101:
                    _6++;
                    return [3 /*break*/, 96];
                case 102:
                    _5++;
                    return [3 /*break*/, 95];
                case 103:
                    _8 = 0, users_5 = users;
                    _17.label = 104;
                case 104:
                    if (!(_8 < users_5.length)) return [3 /*break*/, 109];
                    user = users_5[_8];
                    _9 = 0, companies_7 = companies;
                    _17.label = 105;
                case 105:
                    if (!(_9 < companies_7.length)) return [3 /*break*/, 108];
                    company = companies_7[_9];
                    // You might want to add additional logic to avoid duplicate entries
                    return [4 /*yield*/, prismaClient_1.prisma.newsSubscription.create({
                            data: {
                                userId: user.id,
                                companyId: company.id,
                                // createdAt and modifiedAt will be set automatically
                            },
                        })];
                case 106:
                    // You might want to add additional logic to avoid duplicate entries
                    _17.sent();
                    _17.label = 107;
                case 107:
                    _9++;
                    return [3 /*break*/, 105];
                case 108:
                    _8++;
                    return [3 /*break*/, 104];
                case 109:
                    customizations = ['Analytics X', 'Analytics Y', 'Analytics Z'];
                    userCustomizations = [];
                    _10 = 0, users_6 = users;
                    _17.label = 110;
                case 110:
                    if (!(_10 < users_6.length)) return [3 /*break*/, 115];
                    user = users_6[_10];
                    _11 = 0, customizations_1 = customizations;
                    _17.label = 111;
                case 111:
                    if (!(_11 < customizations_1.length)) return [3 /*break*/, 114];
                    customization = customizations_1[_11];
                    _13 = (_12 = userCustomizations).push;
                    return [4 /*yield*/, prismaClient_1.prisma.userCustomization.create({
                            data: {
                                name: customization,
                                userId: user.id,
                            },
                        })];
                case 112:
                    _13.apply(_12, [_17.sent()]);
                    _17.label = 113;
                case 113:
                    _11++;
                    return [3 /*break*/, 111];
                case 114:
                    _10++;
                    return [3 /*break*/, 110];
                case 115:
                    _14 = 0, companies_8 = companies;
                    _17.label = 116;
                case 116:
                    if (!(_14 < companies_8.length)) return [3 /*break*/, 121];
                    company = companies_8[_14];
                    _15 = 0, userCustomizations_1 = userCustomizations;
                    _17.label = 117;
                case 117:
                    if (!(_15 < userCustomizations_1.length)) return [3 /*break*/, 120];
                    customization = userCustomizations_1[_15];
                    return [4 /*yield*/, prismaClient_1.prisma.userCompanyCustomization.create({
                            data: {
                                companyId: company.id,
                                customizationId: customization.id,
                            },
                        })];
                case 118:
                    _17.sent();
                    _17.label = 119;
                case 119:
                    _15++;
                    return [3 /*break*/, 117];
                case 120:
                    _14++;
                    return [3 /*break*/, 116];
                case 121:
                    i = 0;
                    _17.label = 122;
                case 122:
                    if (!(i < users.length / 2)) return [3 /*break*/, 127];
                    _16 = 0, companies_9 = companies;
                    _17.label = 123;
                case 123:
                    if (!(_16 < companies_9.length)) return [3 /*break*/, 126];
                    company = companies_9[_16];
                    return [4 /*yield*/, prismaClient_1.prisma.companySubscription.create({
                            data: {
                                userId: users[i].id,
                                companyId: company.id,
                            },
                        })];
                case 124:
                    _17.sent();
                    _17.label = 125;
                case 125:
                    _16++;
                    return [3 /*break*/, 123];
                case 126:
                    i++;
                    return [3 /*break*/, 122];
                case 127:
                    console.log('Database has been populated!');
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prismaClient_1.prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
