import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	onApply,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(articleState);
	const asideRef = useRef<HTMLElement>(null);

	useEffect(() => {
		if (!isOpen) {
			return;
		}
		const handleClick = (event: MouseEvent) => {
			if (
				asideRef.current &&
				!asideRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};
		window.addEventListener('mousedown', handleClick);
		return () => window.removeEventListener('mousedown', handleClick);
	}, [isOpen]);

	const handleChange =
		(key: keyof ArticleStateType) => (option: OptionType) => {
			setFormState((prev) => ({ ...prev, [key]: option }));
		};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply(formState);
		setIsOpen(false);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
		setIsOpen(false);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={asideRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Select
						selected={formState.fontFamilyOption}
						onChange={handleChange('fontFamilyOption')}
						options={fontFamilyOptions}
						title='Шрифт'
						placeholder='Выберите шрифт'
					/>
					<Separator />
					<RadioGroup
						name='font-size'
						selected={formState.fontSizeOption}
						onChange={handleChange('fontSizeOption')}
						options={fontSizeOptions}
						title='Размер шрифта'
					/>
					<Separator />
					<Select
						selected={formState.fontColor}
						onChange={handleChange('fontColor')}
						options={fontColors}
						title='Цвет шрифта'
						placeholder='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						onChange={handleChange('backgroundColor')}
						options={backgroundColors}
						title='Цвет фона'
						placeholder='Цвет фона'
					/>
					<Separator />
					<Select
						selected={formState.contentWidth}
						onChange={handleChange('contentWidth')}
						options={contentWidthArr}
						title='Ширина контента'
						placeholder='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
