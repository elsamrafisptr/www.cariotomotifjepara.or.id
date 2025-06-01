#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from functools import lru_cache
import os
from typing import Literal

from dotenv import load_dotenv
from pydantic_settings import BaseSettings, SettingsConfigDict

load_dotenv()

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file='.env',
        env_file_encoding='utf-8',
        extra='ignore',
        case_sensitive=True,
    )

    ENVIRONMENT: Literal['dev', 'pro']

    DATABASE_TYPE: Literal['mysql', 'postgresql']
    DATABASE_HOST: str
    DATABASE_PORT: int
    DATABASE_USER: str
    DATABASE_PASSWORD: str

    TOKEN_SECRET_KEY: str

    DATABASE_ECHO: bool = False
    DATABASE_POOL_ECHO: bool = False
    DATABASE_SCHEMA: str = 'elevaite-db'
    DATABASE_CHARSET: str = 'utf8mb4'

    DB_POOL_MIN: int = 1
    DB_POOL_MAX: int = 10

    DATETIME_TIMEZONE: str = 'Asia/Jakarta'
    DATETIME_FORMAT: str = '%Y-%m-%d %H:%M:%S'

    UPLOAD_READ_SIZE: int = 1024
    UPLOAD_IMAGE_EXT_INCLUDE: list[str] = ['jpg', 'jpeg', 'png', 'gif', 'webp']
    UPLOAD_IMAGE_SIZE_MAX: int = 5 * 1024 * 1024
    UPLOAD_VIDEO_EXT_INCLUDE: list[str] = ['mp4', 'mov', 'avi', 'flv']
    UPLOAD_VIDEO_SIZE_MAX: int = 20 * 1024 * 1024

    IP_LOCATION_PARSE: Literal['online', 'offline', 'false'] = 'offline'
    IP_LOCATION_REDIS_PREFIX: str = 'fba:ip:location'
    IP_LOCATION_EXPIRE_SECONDS: int = 60 * 60 * 24

    TRACE_ID_REQUEST_HEADER_KEY: str = 'X-Request-ID'

    LOG_CID_DEFAULT_VALUE: str = '-'
    LOG_CID_UUID_LENGTH: int = 32
    LOG_STD_LEVEL: str = 'INFO'
    LOG_ACCESS_FILE_LEVEL: str = 'INFO'
    LOG_ERROR_FILE_LEVEL: str = 'ERROR'
    LOG_STD_FORMAT: str = (
        '<green>{time:YYYY-MM-DD HH:mm:ss.SSS}</> | <lvl>{level: <8}</> | '
        '<cyan> {correlation_id} </> | <lvl>{message}</>'
    )
    LOG_FILE_FORMAT: str = (
        '<green>{time:YYYY-MM-DD HH:mm:ss.SSS}</> | <lvl>{level: <8}</> | '
        '<cyan> {correlation_id} </> | <lvl>{message}</>'
    )
    LOG_ACCESS_FILENAME: str = 'fba_access.log'
    LOG_ERROR_FILENAME: str = 'fba_error.log'

    SAFE_WORKERS = os.cpu_count()
    PERFORMANCE_WORKERS = SAFE_WORKERS * 2
    SUPER_WORKERS = SAFE_WORKERS * 4

@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
