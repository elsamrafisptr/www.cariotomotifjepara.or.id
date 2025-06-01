import aiomysql

from core.config import settings


DB_CONFIG = {
    'host': settings.DATABASE_HOST,
    'user': settings.DATABASE_USER,
    'password': settings.DATABASE_PASSWORD,
    'database': settings.DATABASE_SCHEMA,
    'autocommit': True,
}

async def get_db_pool(loop):
    return await aiomysql.create_pool(
        host=settings.DATABASE_HOST,
        port=settings.DATABASE_PORT,
        user=settings.DATABASE_USER,
        password=settings.DATABASE_PASSWORD,
        db=settings.DATABASE_SCHEMA,
        minsize=settings.DB_POOL_MIN,
        maxsize=settings.DB_POOL_MAX,
        loop=loop,
    )