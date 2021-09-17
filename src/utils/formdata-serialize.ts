const isUndefined = (value: unknown) => value === undefined;

const isNull = (value: unknown) => value === null;

const isBoolean = (value: unknown) => typeof value === 'boolean';

const isObject = (value: unknown) => value === Object(value);

const isArray = (value: unknown) => Array.isArray(value);

const isDate = (value: unknown) => value instanceof Date;

const isBlob = (value: any) =>
    value && typeof value.size === 'number' && typeof value.type === 'string' && typeof value.slice === 'function';

const isFile = (value: any) =>
    isBlob(value) &&
    typeof value.name === 'string' &&
    (typeof value.lastModifiedDate === 'object' || typeof value.lastModified === 'number');

const serialize = (obj: any, cfg?: any, fd?: any, pre?: any) => {
    cfg = cfg || {};
    cfg.indices = isUndefined(cfg.indices) ? true : cfg.indices;
    cfg.nullsAsUndefineds = isUndefined(cfg.nullsAsUndefineds) ? false : cfg.nullsAsUndefineds;
    cfg.booleansAsIntegers = isUndefined(cfg.booleansAsIntegers) ? false : cfg.booleansAsIntegers;
    cfg.allowEmptyArrays = isUndefined(cfg.allowEmptyArrays) ? false : cfg.allowEmptyArrays;
    fd = fd || new FormData();

    if (isUndefined(obj)) {
        return fd;
    } else if (isNull(obj)) {
        if (!cfg.nullsAsUndefineds) {
            fd.append(pre, '');
        }
    } else if (isBoolean(obj)) {
        if (cfg.booleansAsIntegers) {
            fd.append(pre, obj ? 1 : 0);
        } else {
            fd.append(pre, obj);
        }
    } else if (isArray(obj)) {
        if (obj.length) {
            obj.forEach((value: any, index: any) => {
                const key = pre + '[' + (cfg.indices ? index : '') + ']';

                serialize(value, cfg, fd, key);
            });
        } else if (cfg.allowEmptyArrays) {
            fd.append(pre + '[]', '');
        }
    } else if (isDate(obj)) {
        fd.append(pre, obj.toISOString());
    } else if (isObject(obj) && !isFile(obj) && !isBlob(obj)) {
        Object.keys(obj).forEach((prop) => {
            const value = obj[prop];
            if (isArray(value)) {
                while (prop.length > 2 && prop.lastIndexOf('[]') === prop.length - 2) {
                    prop = prop.substring(0, prop.length - 2);
                }
            }
            const key = pre ? pre + '.' + prop : prop;

            serialize(value, cfg, fd, key);
        });
    } else {
        fd.append(pre, obj);
    }

    return fd;
};
export default serialize;
