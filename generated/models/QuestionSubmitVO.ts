/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JudgeInfo } from './JudgeInfo';
import type { QuestionVO } from './QuestionVO';
import type { UserVO } from './UserVO';

export type QuestionSubmitVO = {
    code?: string;
    createTime?: string;
    current?: number;
    id?: number;
    judgeInfo?: JudgeInfo;
    language?: string;
    pageSize?: number;
    questionId?: number;
    questionVO?: QuestionVO;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    updateTime?: string;
    userId?: number;
    userVO?: UserVO;
};
