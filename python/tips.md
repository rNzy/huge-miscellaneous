# Python tips

## Virtual environment

```bash
python3 -m venv .venv
source .venv/bin/activate

deactivate
```

**--no-site-packages** - Don't include global packages

## SQLAlchemy / Flask

When declaring path to DB using SQLAlchemy :

This is relative :

```python
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///foobar.db' # 3 forward slashes
```

This is absolute :

```python
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////foobar.db' # 4 forward slashes
```
