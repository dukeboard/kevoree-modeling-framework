
package com.siliconmint.ts.translator;

import com.intellij.psi.*;
import com.intellij.psi.impl.source.PsiAnonymousClassImpl;
import com.intellij.util.containers.HashSet;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class Translators {

    private static final HashMap<Class<? extends PsiElement>, Translator<? extends PsiElement>> translators
            = new HashMap<Class<? extends PsiElement>, Translator<? extends PsiElement>>();

    private static final Set<Class<? extends PsiElement>> ignoredElements = new HashSet<Class<? extends PsiElement>>();
    private static final Set<Class<? extends PsiElement>> skippedElements = new HashSet<Class<? extends PsiElement>>();

    private static final HashMap<Class<?>, Translator<PsiElement>> translatorCache = new HashMap<Class<?>, Translator<PsiElement>>();

    static {
        registerTranslator(PsiWhiteSpace.class, new WhitespaceTranslator());
        registerTranslator(PsiLiteralExpression.class, new LiteralTranslator());

        registerTranslator(PsiAnonymousClass.class, new AnonymousClassTranslator());
        registerTranslator(PsiAnonymousClassImpl.class, new AnonymousClassTranslator());
        registerTranslator(PsiClass.class, new ClassTranslator());
        registerTranslator(PsiField.class, new FieldTranslator());
        registerTranslator(PsiMethod.class, new MethodTranslator());

        registerTranslator(PsiLocalVariable.class, new LocalVariableTranslator());

        registerTranslator(PsiMethodCallExpression.class, new MethodCallExpressionTranslator());
        registerTranslator(PsiNewExpression.class, new NewExpressionTranslator());
        registerTranslator(PsiParenthesizedExpression.class, new ParenthesizedExpressionTranslator());
        registerTranslator(PsiPolyadicExpression.class, new PolyadicExpressionTranslator());
        registerTranslator(PsiReferenceExpression.class, new ReferenceExpressionTranslator());
        registerTranslator(PsiBinaryExpression.class, new BinaryExpressionTranslator());
        registerTranslator(PsiArrayAccessExpression.class, new ArrayAccessExpressionTranslator());
        registerTranslator(PsiInstanceOfExpression.class, new InstanceOfExpressionTranslator());
        registerTranslator(PsiSuperExpression.class, new SuperExpressionTranslator());
        registerTranslator(PsiConditionalExpression.class, new ConditionalExpressionTranslator());
        registerTranslator(PsiThisExpression.class, new ThisExpressionTranslator());
        registerTranslator(PsiTypeCastExpression.class, new TypeCastExpressionTranslator());
        registerTranslator(PsiAssignmentExpression.class, new AssignmentExpressionTranslator());
        registerTranslator(PsiClassObjectAccessExpression.class, new JavaClassObjectAccessExpressionTranslator());
        registerTranslator(PsiArrayInitializerExpression.class, new ArrayInitializerExpressionTranslator());

        registerTranslator(PsiIfStatement.class, new IfStatementTranslator());
        registerTranslator(PsiWhileStatement.class, new WhileStatementTranslator());
        registerTranslator(PsiDoWhileStatement.class, new DoWhileStatementTranslator());
        registerTranslator(PsiForStatement.class, new ForStatementTranslator());
        registerTranslator(PsiForeachStatement.class, new ForEachStatementTranslator());
        registerTranslator(PsiReturnStatement.class, new ReturnStatementTranslator());
        registerTranslator(PsiBreakStatement.class, new BreakStatementTranslator());
        registerTranslator(PsiContinueStatement.class, new ContinueStatementTranslator());
        registerTranslator(PsiExpressionStatement.class, new ExpressionStatementTranslator());
        registerTranslator(PsiThrowStatement.class, new ThrowStatementTranslator());
        registerTranslator(PsiTryStatement.class, new TryStatementTranslator());
        registerTranslator(PsiSwitchStatement.class, new SwitchStatementTranslator());
        registerTranslator(PsiSwitchLabelStatement.class, new SwitchLabelStatementTranslator());
        registerTranslator(PsiPackageStatement.class, new PackageStatementTranslator());
        registerTranslator(PsiImportStatement.class, new ImportStatementTranslator());
        registerTranslator(PsiImportStaticStatement.class, new ImportStaticStatementTranslator());

        registerTranslator(PsiJavaToken.class, new JavaTokenTranslator());

        // Ignored code structures
        ignoredElements.add(PsiAnnotation.class);
        ignoredElements.add(PsiAssertStatement.class);
        ignoredElements.add(PsiTypeParameterList.class);
        ignoredElements.add(PsiReferenceParameterList.class);

        // Skipped elements
        skippedElements.add(PsiJavaFile.class);
        skippedElements.add(PsiImportList.class);
    }

    private static <T extends PsiElement> void registerTranslator(Class<T> clazz, Translator<T> translator) {
        translators.put(clazz, translator);
    }

    public static Translator<PsiElement> getTranslator(PsiElement element){
        Class<?> elementClass = element.getClass();

        Translator<PsiElement> translator = translatorCache.get(element.getClass());
        if (translator != null) {
            return translator;
        } else {
            for (Class<? extends PsiElement> ignoredElementType: ignoredElements) {
                if (ignoredElementType.isAssignableFrom(elementClass)) {
                    translator = NullTranslator.INSTANCE;
                    break;
                }
            }
        }

        if (translator == null) {
            for (Class<? extends PsiElement> skippedElementType: skippedElements) {
                if (skippedElementType.isAssignableFrom(elementClass)) {
                    translator = SkipTranslator.INSTANCE;
                    break;
                }
            }
        }

        if (translator == null) {
            for (Map.Entry<Class<? extends PsiElement>, Translator<? extends PsiElement>> registeredTranslatorEntry: translators.entrySet()) {
                Class<? extends PsiElement> translatedElementType = registeredTranslatorEntry.getKey();
                if (translatedElementType == elementClass) {
                    translator = (Translator<PsiElement>) registeredTranslatorEntry.getValue();
                    break;
                }
            }
        }

        if (translator == null) {
            for (Map.Entry<Class<? extends PsiElement>, Translator<? extends PsiElement>> registeredTranslatorEntry: translators.entrySet()) {
                Class<? extends PsiElement> translatedElementType = registeredTranslatorEntry.getKey();
                if (translatedElementType.isAssignableFrom(elementClass)) {
                    translator = (Translator<PsiElement>) registeredTranslatorEntry.getValue();
                    break;
                }
            }
        }

        if (translator == null) {
            translator = SkipTranslator.INSTANCE;
        }

        translatorCache.put(elementClass, translator);
        return translator;
    }

}
